import React,{useState} from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Input,
    TextField,
    Typography,
    IconButton,
    Tooltip,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreTwoTone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AddContent({content,addContent}) {

    const [name,setName]=useState('');
    const [video,setVideo]=useState('');
    const [file,setFile]=useState('');
    const [description,setDescription]=useState('');

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddContent=()=>{
        addContent({name,video,file,description});
        handleClose();
    }



    return (
        <>
            <Card sx={{ marginTop: '50px' }}>
                <CardHeader
                    title="Add Course Content"
                    subheader="Please fill all the fields"
                    action={
                        <Tooltip title="Add Course Content">
                            <IconButton aria-label="Add Icon" onClick={handleClickOpen}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    {content.map(con=>

                    <Box sx={{ display: 'flex',marginBottom:'10px' }}>
                        <Accordion sx={{ width: '100%', height:'100%',border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '10px', marginRight: '5px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h4">👉 {con.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.3)', }}>
                            <Box sx={{ display: 'flex',alignItems: 'center'}}>
                                    <YouTubeIcon />
                                    <Typography sx={{ marginLeft: '10px' }}>
                                        Content Video
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', }}>
                                <FolderIcon />
                                    <Typography sx={{ marginLeft: '10px',alignItems: 'center' }}>
                                        Files
                                    </Typography> 
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                        <Box sx={{ display:'flex'}}>
                        <Tooltip title="Edit Content">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Content">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        </Box>


                    </Box>
                    )}

                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Content</DialogTitle>
                <DialogContent>
                    <TextField value={name} onChange={e=>setName(e.target.value)} id="outlined-basic" label="Content Name" variant="outlined" sx={{ width: '100%', marginBottom: '15px' }} />
                    <TextField value={description} onChange={e=>setDescription(e.target.value)} multiline maxRows={8} id="outlined-basic" label="Content Description(markdown text,follow the below link)" variant="outlined" sx={{ width: '100%', marginBottom: '10px' }} />
                    <Typography variant="h6" sx={{ marginTop: '5px' }}>Click the link to create md text(<a href="https://markdownlivepreview.com/" target="_blank">https://markdownlivepreview.com/</a>). Max Length 500</Typography>
                    <TextField value={video} onChange={e=>setVideo(e.target.value)} id="outlined-basic" label="Content Video Link" variant="outlined" sx={{ width: '100%', marginBottom: '15px', marginTop: '10px' }} />
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>Content Files</Typography>
                    <TextField value={file} onChange={e=>setFile(e.target.value)} id="outlined-basic" label="Content File drive/online Link" variant="outlined" sx={{ width: '100%' }} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddContent}>Add Content</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
