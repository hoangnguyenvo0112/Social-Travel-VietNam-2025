import { userManagerService } from "@/services/userManager.services";
import { toast } from "@/utils/toast";
import { formatDate } from "@fullcalendar/core";
import viLocale from "@fullcalendar/core/locales/vi";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { tokens } from "../../theme/theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [myEvents, setMyEvents] = useState([
    // {
    //   id: "12315",
    //   title: "Đăng bài",
    //   date: "2023-07-20",
    // },
    // {
    //   id: "5123",
    //   title: "Nạp tiền hệ thống",
    //   date: "2023-07-28",
    // },
    // {
    //   id: "5124",
    //   title: "Mua dịch vụ",
    //   date: "2023-07-22",
    // },
    // {
    //   id: "5125",
    //   title: "Xem tương tác",
    //   date: "2023-07-23",
    // },
    // {
    //   id: 1231,
    //   title: "Birthday Party",
    //   start: "2023-07-11T14:00:00",
    //   end: "2023-07-12T16:00:00",
    // },
  ]);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(async () => {
    await userManagerService.getMyEvents().then((data) => {
      const mapperToCalendar=data.map(item=>{
        return {
          id: item._id,
          title: item.name,
          start: item.startDate,
          end: item.endDate,
        }
      })
      console.log(mapperToCalendar)
      setMyEvents(mapperToCalendar);
    });
  }, []);

  // UPDATE EVENT
  useEffect(async () => {
    // update event
    console.log(currentEvents[0]);
    //let list_event = currentEvents.map((item,index))
  }, [currentEvents]);

  // ADD EVENT
  const [tempSelected, setTempSelected] = useState();
  const [openAddEvent, setOpenAddEvent] = useState(false);

  const handleDateClick = (selected) => {
    setTempSelected(selected);
    setOpenAddEvent(true);
  };

  const handleAddConfirm = (content) => {
    const calendarApi = tempSelected.view.calendar;
    calendarApi.unselect();
    console.log(tempSelected);
    calendarApi.addEvent({
      id: `${tempSelected.dateStr}-${content}`,
      title: content,
      start: tempSelected.startStr,
      end: tempSelected.endStr,
      allDay: tempSelected.allDay,
    });
    userManagerService
      .createEvent({
        name: content,
        startDate: tempSelected.startStr,
        endDate: tempSelected.endStr,
      })
      .then((data) => {
        toast("Thêm sự kiện thành công");
      });
    // Call api he
    setOpenAddEvent(false);
  };

  // REMOVE EVENT
  const [msg, setMsg] = useState("");
  const [tempEvent, setTempEvent] = useState();
  const [openRemoveEventConfirm, setOpenRemoveEventConfirm] = useState(false);

  const handleRemoveClick = (event) => {
    setTempEvent(event);
    console.log(event)
    setMsg(`Bạn có muốn xóa sự kiện '${event.title}' ?`);
    setOpenRemoveEventConfirm(true);
  };

  const handleRemoveEventConfirm = () => {
    setMsg("");

    userManagerService.deleteEvent({eventId:tempEvent.id})
    tempEvent.remove();
    setOpenRemoveEventConfirm(false);
    setTempEvent(null);
  };

  // CREATE EVENT DESC POPUP
  const [openDesc, setOpenDesc] = useState(false);
  const [value, setValue] = useState(null);

  const handleCloseDesc = (value) => {
    setOpenDesc(false);
  };

  const handleEventClick = (selected) => {
    setValue(selected.event);
    setOpenDesc(true);
  };

  return (
    <Box m="20px">
      <h2>Danh sách sự kiện</h2>
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <List
          sx={{
            overflow: "auto",
            maxHeight: 500,
            padding: "15px",
            borderRadius: "4px",
            flex: "1 1 30%",
            backgroundColor: `${colors.primary[400]}`,
          }}
        >
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                backgroundColor: colors.greenAccent[700],
                margin: "10px 0",
                borderRadius: "2px",
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => handleRemoveClick(event)}
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: colors.redAccent[500] }}
                  />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  <Typography noWrap variant="h5" sx={{ maxWidth: "120px" }}>
                    {event.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="h6">
                    {moment(event.start).format("DD/MM/YYYY")}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* CALENDAR */}
        <Box
          flex="1 1 100%"
          ml="15px"
          sx={{
            "& .fc-theme-standard .fc-list-day-cushion": {
              backgroundColor: colors.primary[400],
            },
            "& .fc-theme-standard .fc-popover-header": {
              backgroundColor: colors.primary[400],
            },
            "& .fc-theme-standard .fc-popover-body": {
              backgroundColor: colors.primary[400],
            },
            "& .fc .fc-list-event:hover td": {
              backgroundColor: colors.primary[400],
            },
          }}
        >
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            locale={viLocale}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            events={myEvents}
            
          />
        </Box>
      </Box>
      <SimpleDialog value={value} open={openDesc} onClose={handleCloseDesc} />
      <RemoveEventConfirm
        value={msg}
        open={openRemoveEventConfirm}
        setOpen={setOpenRemoveEventConfirm}
        onConfirm={handleRemoveEventConfirm}
      />
      <AddEventDialog
        open={openAddEvent}
        setOpen={setOpenAddEvent}
        onConfirm={handleAddConfirm}
      />
    </Box>
  );
};

const SimpleDialog = (props) => {
  const { onClose, value, open } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClose = () => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography variant="h4">Thông tin chi tiết</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" color={colors.grey[100]}>
          {value?.title}
        </Typography>
        <Typography variant="h5" color={colors.blueAccent[500]}>
          Thời gian{" "}
          {formatDate(value?.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

const RemoveEventConfirm = (props) => {
  const { onConfirm, value, open, setOpen } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleConfirm = () => {
    onConfirm("delete");
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography variant="h4">Thông báo</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" color={colors.grey[100]}>
          {value}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontSize: "16px" }}
          color="error"
          onClick={() => handleConfirm()}
        >
          Xóa
        </Button>
        <Button
          sx={{ fontSize: "16px" }}
          color="info"
          onClick={() => setOpen(false)}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddEventDialog = (props) => {
  const { open, setOpen, onConfirm } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [content, setContent] = useState(null);

  const handleConfirm = () => {
    if (content !== null) {
      onConfirm(content);
      setContent(null);
    } else setOpen(false);
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography variant="h4">Vui lòng nhập thông tin sự kiện</Typography>
      </DialogTitle>
      <DialogContent sx={{ width: "600px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="event"
          type="text"
          fullWidth
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontSize: "16px" }}
          color="info"
          onClick={() => handleConfirm()}
        >
          Thêm
        </Button>
        <Button
          sx={{ fontSize: "16px" }}
          color="error"
          onClick={() => setOpen(false)}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Calendar;
