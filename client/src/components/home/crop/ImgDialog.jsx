import React from 'react'
import {
	Dialog,
	Slide,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

const styles = {
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
	imgContainer: {
		position: 'relative',
		flex: 1,
		padding: 16,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		maxWidth: '100%',
		maxHeight: '100%',
	},
}

function Transition(props) {
	return <Slide direction="up" {...props} />
}

class ImgDialog extends React.Component {
	state = {
		open: false,
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	render() {
		return (
			<Dialog
				fullScreen
				open={!!this.props.img}
				onClose={this.props.onClose}
				TransitionComponent={Transition}
			>
				<AppBar>
					<Toolbar>
						<IconButton
							color="inherit"
							onClick={this.props.onClose}
							aria-label="Close"
						>
							<CloseIcon />
						</IconButton>
						<Typography
							variant="title"
							color="inherit"
							
						>
							Ảnh sau khi cắt
						</Typography>
					</Toolbar>
				</AppBar>
				<div className='m-auto'>
					<img src={this.props.img} alt="Cropped" className='h-[500px] w-auto '/>
				</div>
			</Dialog>
		)
	}
}

export default ImgDialog
