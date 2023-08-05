import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Modal,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { Logout, Add, Book, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  name: string;
  author: string;
  publishing: string;
}

export const HomeApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<string | null>()
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    publishing: '',
  });
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/")
      toast.error("hmmmmmm ta tentando entrar sem fazer login né")
    }
    setUser(localStorage.getItem("user"))
    fetchBooks();
    const storageListener = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          setUser(localStorage.getItem('user'));
          fetchBooks();
        } else {
          navigate('/');
          toast.error('Hmmm, tentando entrar sem fazer login, né?');
        }
      }
    };

    window.addEventListener('storage', storageListener);

    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, []);

  

  const fetchBooks = async () => {

       axios.get(`${process.env.REACT_APP_API_BOOKS}/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
       }).then((res) => {
        setBooks(res.data);
      }).catch((err) => {
        toast.error(err.message)
      })

  };


  const [selectedBook, setSelectedBook] = useState<Book | null>(null); 
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleEditModalOpen = (book: Book) => {
    setSelectedBook(book); 
    setEditModalOpen(true); 
  };

  const handleEditBook = (e: any) => {
    e.preventDefault()

    const selectedBookEdited = {
          name: newBook.name === "" ? selectedBook?.name : newBook.name,
          author: newBook.author === "" ? selectedBook?.author : newBook.author,
          publishing: newBook.publishing === "" ? selectedBook?.publishing : newBook.publishing,
    }
    axios.put(`${process.env.REACT_APP_API_BOOKS}/books/${selectedBook?.id}`, selectedBookEdited,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      fetchBooks();
      setNewBook({
        name: '',
        author: '',
        publishing: '',
      });
      setEditModalOpen(false)
    }).catch((err) => {
      toast.error(err.responde.data.message)
    })
  }

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAddBook = async (e: any) => {
    e.preventDefault()
       axios.post(`${process.env.REACT_APP_API_BOOKS}/books`, newBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
       }).then((res) => {
        fetchBooks();
        setNewBook({
          name: '',
          author: '',
          publishing: '',
        });
        handleModalClose();
        toast.success("Livro cadastrado com sucesso")
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
   
  };

  function handleDeleteBook(id: string): void {
    axios.delete(`${process.env.REACT_APP_API_BOOKS}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      toast.success(res.data.message)
      fetchBooks()
    }).catch((err) => {
      toast.error(err.responde.data.message)
    })
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
           TesteLândia
          </Typography>
          <Box sx={{
            display: "flex",
            alignItems: "center"
          }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {user}
          </Typography>
          <IconButton color="inherit" onClick={() => {
            localStorage.clear()
            navigate("/")}}
            >
            <Logout />
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Button variant="contained" sx={{marginTop: 5}} color="primary" onClick={handleModalOpen}>
          Adicionar Livro
        </Button>
        <List>
          {books.map(book => (
            <ListItem key={book.id}>
              <Paper style={{ padding: '10px', width: '100%', display: 'flex', alignItems: 'center' }}>
                <Book style={{ marginRight: '8px' }} />
                <ListItemText
                  primary={book.name}
                  secondary={`${book.author}, ${book.publishing}`}
                />
                <Box>
                <IconButton color="primary" onClick={() => handleEditModalOpen(book)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteBook(book.id)}>
                  <Delete />
                </IconButton>
                </Box>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          component={"form"}
          onSubmit={handleAddBook}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            outline: 'none',
          }}
        >
          <Box
          sx={{display: "flex", width: "100%", justifyContent: "space-between",
          alignItems: "center"
        }}
          >

          <h2>Adicionar Livro</h2>
          <Button sx={{color: "red"}} onClick={handleModalClose}><h2>X</h2></Button>
          </Box>
          <TextField
            label="Nome"
            fullWidth
            required
            margin="normal"
            value={newBook.name}
            onChange={e => setNewBook({ ...newBook, name: e.target.value })}
          />
          <TextField
            label="Autor"
            fullWidth
            required
            margin="normal"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
          <TextField
            label="Editora"
            fullWidth
            required
            margin="normal"
            value={newBook.publishing}
            onChange={e => setNewBook({ ...newBook, publishing: e.target.value })}
          />
          <Button variant="contained" color="primary" type='submit'>
            Adicionar
          </Button>
        </Box>
      </Modal>
      <Modal open={editModalOpen}>
        <Box
          component={"form"}
          onSubmit={handleEditBook}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            outline: 'none',
          }}
        >
          <Box
          sx={{display: "flex", width: "100%", justifyContent: "space-between",
          alignItems: "center"
        }}
          >

          <h2>Editar Livro</h2>
          <Button sx={{color: "red"}} onClick={() => setEditModalOpen(false)}><h2>X</h2></Button>
          </Box>
          <TextField
            label="Nome"
            fullWidth
            required
            margin="normal"
            defaultValue={selectedBook?.name}
            onChange={e => setNewBook({ ...newBook, name: e.target.value })}
          />
          <TextField
            label="Autor"
            fullWidth
            required
            defaultValue={selectedBook?.author}
            margin="normal"
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
          <TextField
            label="Editora"
            fullWidth
            defaultValue={selectedBook?.publishing}
            required
            margin="normal"
            onChange={e => setNewBook({ ...newBook, publishing: e.target.value })}
          />
          <Button variant="contained" color="primary" type='submit'>
            Editar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

