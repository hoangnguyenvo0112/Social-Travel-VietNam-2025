import AddBoxIcon from "@mui/icons-material/AddBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { groupService } from "@/services/groupServices";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, toastError } from "@/utils/toast";
import Loading from "@/components/Loading";
import moment from "moment";

const GroupIntroduce = ({ groupId }) => {

  // Show popupEdit
  const [openEditIntro, setOpenEditIntro] = useState(false);
  const [openEditRule, setOpenEditRule] = useState(false);
  const [group, setGroup] = useState(null);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    groupService
      .getGroupById(groupId)
      .then((data) => {
        setGroup(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupId, update]);

  return (<>
    {group === null ? (
      <Loading />
    ) :(
    <>
      <div className="my-3  p-[10px] bg-white border rounded-lg">
        <div className="flex justify-between items-center">
          <strong>Giới thiệu về nhóm này</strong>
          {group?.isOwner && (
            <IconButton
              type="button"
              className="focus:outline-none"
              sx={{ p: 1 }}
              onClick={() => setOpenEditIntro(true)}
            >
              <BorderColorIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          )}
        </div>
        <hr className="my-2" />
        <p className="text-gray-800 text-[14px] my-1 whitespace-pre-line">
          {group?.infoGroup?.desc}
        </p>
        <hr className="my-2" />
        {group?.infoGroup.privacy == "public" ? (
          <div className="flex items-center my-1">
            <span class="material-icons mr-2 text-[28px]">public</span>
            <div>
              <strong className="text-[14px]">Công khai</strong>
              <p className="text-gray-400 text-[12px]">
                Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì
                họ đăng.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center my-1">
            <span class="material-icons mr-2 text-[28px]">visibility</span>
            <div>
              <strong className="text-[14px]">Riêng tư</strong>
              <p className="text-gray-400 text-[12px]">
                Chỉ những thành viên trong nhóm mới xem được
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="my-3 p-[10px] bg-white border rounded-lg">
        <div className="flex">
          <strong>Tổng quan</strong>
        </div>
        <hr className="my-2" />
       
        <div className="flex items-center my-1">
          <div class="mr-2  text-[24px] text-blue-500">
            <GroupIcon />
          </div>
          <div>
            <p>{`Tổng cộng có ${group?.infoGroup?.members?.length+1} thành viên`}</p>
            
          </div>
        </div>
        <div className="flex items-start my-1">
          <div class="mr-2 mt-1 text-[24px] text-red-500">
            <WatchLaterIcon />
          </div>
          <div>
            <p>Lịch sử</p>
            <p className="text-gray-500 text-[12px]">
              Đã tạo nhóm vào {moment(group?.infoGroup?.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="my-3  p-[10px] bg-white border rounded-lg">
        <div className="flex justify-between items-center">
          <strong>Quy tắc nhóm</strong>
          {group?.isOwner && (
            <IconButton
              type="button"
              className="focus:outline-none"
              sx={{ p: 1 }}
              onClick={() => setOpenEditRule(true)}
            >
              <BorderColorIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          )}
        </div>
        <hr className="my-2" />
        {rules.map((item, index) => (
          <div className="flex items-start">
            <strong class="mr-2 mt-1 text-[14px] ">{index + 1}</strong>
            <div>
              <strong className="text-[14px]">{item.title}</strong>
              <p className="text-gray-500 text-[12px]">{item.content}</p>
            </div>
          </div>
        ))}
      </div> */}

      <EditIntro
        group={group}
        openEditIntro={openEditIntro}
        setOpenEditIntro={setOpenEditIntro}
        setUpdate={setUpdate}
      />
      <EditRule
        group={group}
        openEditRule={openEditRule}
        setOpenEditRule={setOpenEditRule}
      />
    </>)}
    </>
  );
};

export default GroupIntroduce;

const EditIntro = ({ openEditIntro, setOpenEditIntro, group ,setUpdate }) => {
  const [privacy, setPrivacy] = useState(group?.infoGroup?.privacy);
  const [desc, setDesc] = useState(group?.infoGroup?.desc);

  const handleChange = (event) => {
    setPrivacy(event.target.value);
  };

  const handleSaveEditIntro = (event) => {
    // cập nhật lên API
    // groupId, desc, privacy
    let dataUpdate = {
      groupId: group.infoGroup._id,
      desc: desc,
      privacy: privacy
    }
    try {
      groupService.updateGroup(dataUpdate).then((data)=>{
        setUpdate(data);
        toast("Cập nhật thành công");
        setOpenEditIntro(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={openEditIntro} fullScreen={fullScreen}>
      <DialogTitle>Giới thiệu</DialogTitle>
      <DialogContent style={{ width: `${fullScreen ? "100%" : "600px"}` }}>
        <TextField
          sx={{ width: "100%", mb: 3, mt: 1 }}
          id="standard-multiline-static"
          label="Mô tả"
          multiline
          rows={10}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          variant="outlined"
        />
        <FormControl sx={{ mt: 1, width: "100%" }}>
          <InputLabel htmlFor="demo-dialog-native">Tình trạng</InputLabel>
          <Select
            value={privacy}
            onChange={handleChange}
            input={<OutlinedInput label="Tình trạng" id="demo-dialog-native" />}
          >
            <MenuItem value={"public"}>Công khai</MenuItem>
            <MenuItem value={"private"}>Riêng tư</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSaveEditIntro()}>Lưu</Button>
        <Button onClick={() => setOpenEditIntro(false)}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

const EditRule = ({ openEditRule, setOpenEditRule, group }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // fakedata
  const [rules, setRules] = useState([
    {
      title: "Thêm hashtag #khamphasaigon để được phê duyệt!",
      content:
        "Ngoài ra bạn có thể dùng kèm 3 hashtag dưới hoặc hashtag cá nhân để được phê duyệt bài nhanh #combodulichgiare #gotovietnam #explorevietnam",
    },
    {
      title: "Thêm hashtag #khamphasaigon để được phê duyệt!",
      content:
        "Ngoài ra bạn có thể dùng kèm 3 hashtag dưới hoặc hashtag cá nhân để được phê duyệt bài nhanh #combodulichgiare #gotovietnam #explorevietnam",
    },
    {
      title: "Thêm hashtag #khamphasaigon để được phê duyệt!",
      content:
        "Ngoài ra bạn có thể dùng kèm 3 hashtag dưới hoặc hashtag cá nhân để được phê duyệt bài nhanh #combodulichgiare #gotovietnam #explorevietnam",
    },
    {
      title: "Thêm hashtag #khamphasaigon để được phê duyệt!",
      content:
        "Ngoài ra bạn có thể dùng kèm 3 hashtag dưới hoặc hashtag cá nhân để được phê duyệt bài nhanh #combodulichgiare #gotovietnam #explorevietnam",
    },
  ]);

  // remove rule at index
  const [openDel, setOpenDel] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);
  const handleOpenDelDialog = (index) => {
    setTempIndex(index);
    setOpenDel(true);
  };
  const handleYes = () => {
    handleDeleteRule(tempIndex);
    setOpenDel(false);
  };
  const handleDeleteRule = (index) => {
    // add tepm
    const temp = [...rules];
    // removing the element using splice
    temp.splice(index, 1);
    // updating the list
    setRules(temp);
  };

  // open add rule
  const [openAdd, setOpenAdd] = useState(false);
  const [rule, setRule] = useState({ title: "", content: "" });
  const handleAddRule = () => {
    setRules((oldRule) => [...oldRule, rule]);
    setRule({ title: "", content: "" });
    setOpenAdd(false);
  };

  // save rule after edit
  const handleSaveEditRule = () => {
    // cập nhật lên API
    setOpenEditRule(false);
  };

  return (
    <>
      <Dialog open={openEditRule} fullScreen={fullScreen}>
        <DialogTitle>
          Quy tắc nhóm
          <Tooltip title="Thêm quy tắc" arrow>
            <IconButton
              type="button"
              className="focus:outline-none"
              sx={{ p: 1 }}
              onClick={() => setOpenAdd(true)}
            >
              <AddBoxIcon sx={{ fontSize: "24px", color: "#22c55e" }} />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent style={{}}>
          {rules.map((item, index) => (
            <div className="flex w-full items-center justify-between">
              <Accordion key={index} sx={{ my: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.content}</Typography>
                </AccordionDetails>
              </Accordion>
              <Tooltip title="Xóa" arrow>
                <IconButton
                  type="button"
                  className="focus:outline-none"
                  sx={{ p: 1, ml: 1 }}
                  onClick={() => handleOpenDelDialog(index)}
                >
                  <DeleteIcon sx={{ fontSize: "18px", color: "#ef4444" }} />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSaveEditRule()}>Lưu</Button>
          <Button onClick={() => setOpenEditRule(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
      {/* ADD RULE */}
      <Dialog open={openAdd} fullScreen={fullScreen}>
        <DialogTitle>Quy tắc nhóm</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ width: "100%", mt: 1 }}
            label="Tiêu đề"
            value={rule.title}
            onChange={(e) =>
              setRule((prev) => ({ ...prev, title: e.target.value }))
            }
            variant="outlined"
          />
          <TextField
            sx={{ width: "100%", mt: 1 }}
            label="Nội dung"
            multiline
            rows={2}
            value={rule.content}
            onChange={(e) =>
              setRule((prev) => ({ ...prev, content: e.target.value }))
            }
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddRule()}>Thêm</Button>
          <Button onClick={() => setOpenAdd(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>

      {/* DELETE RULE */}
      <Dialog open={openDel}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa quy tắc này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleYes()}>Chắc chắn</Button>
          <Button onClick={() => setOpenDel(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
