import { useContext ,useState} from "react";
import axios from "axios"
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;
const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);
    const [error, setError] = useState(null);
    console.log('this is the comment id',comment._id)
    const removeComment = async () => {
        try {
          await axios.delete(`http://localhost:8000/deletecomment/${comment._id}`);
          console.log('Deletion successful');
          setToggle((prev) => !prev);
          return true;
        } catch (error) {
          console.error('Error during deletion', error);
          setError('An error occurred during deletion');
          return false;
        }
      };
        

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />}
            </Container>
            <Typography>{comment.comments}</Typography>
            {error && <Typography color="error">{error}</Typography>}
        </Component>
    );
};

export default Comment;
