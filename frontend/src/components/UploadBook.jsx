"use client";
import { Label } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { useCreateBookMutation } from '../redux/api/books';
import { setBooksFilter } from '../redux/features/books/bookSlice';
import { toast } from 'react-toastify';

const UploadBook = () => {
  const [createBook] = useCreateBookMutation()

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [image,setImage] = useState([])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  console.log(title,author,category,image)

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = async (e)=>{
     e.preventDefault()
     try {
        const res = await createBook({title,author,price,quantity,category,image}).unwrap()
        console.log(res)
        dispatch(setBooksFilter({...res}))
        toast.success("book registered successfully")
      } catch (err) {
         //console.log(error)
         toast.error(err?.data?.message || err.error);
      }
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 2, bgcolor: 'white', borderRadius: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
        Add Book
      </Typography>

      <TextField
        fullWidth
        label="Book Name"
        variant="filled"
        id='title'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: '#2196f3' } }}
        InputLabelProps={{ sx: { color: '#2196f3' } }}
      />

      <TextField
        fullWidth
        label="Author Name"
        variant="filled"
        id='author'
        name='author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: 'transparent' } }}
      />
       <TextField
        fullWidth
        label="Quantity"
        variant="filled"
        id='quantity'
        name='quantity'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: 'transparent' } }}
      />
       <TextField
        fullWidth
        label="Price"
        variant="filled"
        id='price'
        name='price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: 'transparent' } }}
      />

      <Select
        fullWidth
        value={category}
        id='category'
        name='category'
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        variant="filled"
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: 'transparent' } }}
      >
        <MenuItem value="" disabled>
          Category
        </MenuItem>
        <MenuItem value="fiction">Fiction</MenuItem>
        <MenuItem value="non-fiction">Adventure</MenuItem>
        <MenuItem value="non-fiction">Romance</MenuItem>
        {/* Add more categories as needed */}
      </Select>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton component="label" sx={{ color: '#2196f3'}}>
                <UploadIcon />
                <input name='image' hidden type="file" id="image" onChange={handleFileChange}/>
            </IconButton>
            <InputLabel htmlFor="image" sx={{ color: '#2196f3' }}>
                Upload Book Cover
            </InputLabel>
        </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 2,
          backgroundColor: '#2196f3',
          '&:hover': {
            backgroundColor: '#1e88e5',
          },
        }}
        onClick={handleSubmit}
      >
        Add
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-book-modal"
        aria-describedby="modal-to-add-new-book"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Book
          </Typography>
          {/* Add form fields for new book here */}
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadBook;