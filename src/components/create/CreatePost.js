import React  from 'react';
import { TextField, Box, Grid,Paper,Button, MenuItem,Container, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider';


const OuterBox =styled(Box)`
    margin:30px;
`
const Header =styled(Box)`
 margin-top:60px;
 font-size:25px;
 padding:15px;
 border-radius: 40px;
 color:white;
 font-weight: bold;
 background-color: black;
 display: inline-block
`
const InnerBox=styled(Container)`
    margin-top:10px;
    border-radius: 40px;
    border: 1.9px solid rgba(129, 128, 126, 0.374);
    padding:20px;
    display: flex;
`
const GridStyled=styled(Grid)`
    margin:5px;

`
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    
  }));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const Preview=styled(Box)`
    height: 410px;
    width:100%;
    border: 2.9px solid rgba(129, 128, 126, 0.374);
    margin-top: 10px; 
    display: flex;
    align-items: center;
    justify-content: center;
`
  const Genre = [
        {
        value: 'Book Blog',
        label: 'Book Blog',
        },
        {
        value: 'Fashion Blog',
        label: 'Fashion Blog',
        },
        {
        value: 'Food Blog',
        label: 'Food Blog',
        },
        {
        value: 'Gaming Blog',
        label: 'Gaming Blog',
        },
        {
        value: 'Motivational Blog',
        label: 'Motivational Blog',
        },
        {
        value: 'Movie Blog',
        label: 'Movie Blog',
        },
        {
        value: 'Tech Blog',
        label: 'Tech Blog',
        },
        {
        value: 'Other',
        label: 'Other',
        },
  ];

const CreatePost = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [allImage, setAllImage] = useState(null);
    const { account } = useContext(DataContext);

    const onInputChange =(e)=>{
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    const history = useNavigate();
    const [formData, setFormData] = useState({
        title:null,
        tagline:null,
        discription:null,
        genre: 'Other',
        image
      });

      useEffect(() => {
        getImage();
      }, []);

      const getImage = async () => {
        const result = await axios.get("http://localhost:8000/get-image");
        console.log(result);
        setAllImage(result.data.data);
      };
    const handleFormSubmit = async (e,title,tagline,discription,genre) => {
        e.preventDefault();
        debugger
        console.log(account.username)
        const formData = new FormData();
        formData.append("username", account.username);
        formData.append("image", image);
        formData.append("title", title);
        formData.append("tagline", tagline);
        formData.append("discription", discription);
        formData.append("genre", genre);
        try{
            await axios.post("http://localhost:8000/create",
                
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
                
            ) 
            .then(res=>{
                if(res.data ==="exist"){
                    alert("Same blog already created successfully");
                    history("/home")
                }
                else if (res.data === "notexist"){
                    alert("Blog post created successfully");
                    history("/explore")
                }
            });navigate('/explore')
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }
      };
 
      const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setImage(file)
        console.log(file)
      };

     const onValueChange1=(form,field,value)=>{
        setFormData((prevFormData)=>({...prevFormData,[field]:value}))
     };
    return (   
    
       <OuterBox>
            <Header>
                Create Blog
            </Header>
            <InnerBox maxWidth="sm={3}">
                <Box sx={{ flexGrow: 1 }}>
                    <GridStyled container spacing={3}>
                        <GridStyled item xs={5}>
                       <Item>
                        <Preview>
                                {image ? <img style={{height:'100%', width:'100%'}} src={URL.createObjectURL(image)} alt=''/> : <CloudUploadIcon/>}
                           </Preview>
                                    <br></br>
                            <Button style={{backgroundColor:'black'}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>

                            {image ? image.name : 'Upload file'}
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                            </Button>
                        </Item>
                        </GridStyled>
                        <GridStyled item xs={6.3}>
                        <Item component="form"sx={{'& .MuiTextField-root': { m: 1, width: '100%' },}}>
                        <p>Title</p>
                        <TextField
                            required
                            id="outlined-required"
                            label="Add a Title"
                            onChange={(e)=>onValueChange1('formData','title',e.target.value) } value={formData.title}
                            />
                        <p>Tagline</p>
                        <TextField
                            required
                            id="outlined-required"
                            label="Add tagline"
                            onChange={(e)=>onValueChange1('formData','tagline',e.target.value) } value={formData.tagline}
                            />
                        <p>Discription</p>
                        <TextField
                            required
                            id="outlined-required"
                            label="Add a Discription"
                            onChange={(e)=>onValueChange1('formData','discription',e.target.value) } value={formData.discription}
                            />
                        <p>Genre</p>
                        
                        <TextField
                        id="outlined-select"
                        select
                        label="Specify your genre"
                        defaultValue="Other"
                        onChange={(e)=>onValueChange1('formData','genre',e.target.value) } value={formData.genre} 
                        >
                        {Genre.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        </Item>
                        </GridStyled>
                    </GridStyled>
                   
                </Box>
                <Button style={{backgroundColor:'black'}} variant="contained" onClick={(e) =>handleFormSubmit(e,formData.title,formData.tagline,formData.discription,formData.genre)}>
                    <p style={{fontWeight: 'bold'}}>CREATE <br></br> MY BLOG</p>
                </Button>
            </InnerBox>
       </OuterBox>
    )
}

export default CreatePost;