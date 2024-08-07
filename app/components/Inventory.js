'use client';
import { Box, Stack, Typography, Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { firestore, auth } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from './NavBar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Inventory() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemUnit, setItemUnit] = useState('');
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const router = useRouter();

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item, quantity, unit) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentCount = docSnap.data().count || 1;
      await setDoc(docRef, { count: currentCount + quantity, unit });
    } else {
      await setDoc(docRef, { count: quantity, unit });
    }
    await updatePantry();
  };

  const editItem = async (name, quantity, unit) => {
    const docRef = doc(collection(firestore, 'pantry'), name);
    await setDoc(docRef, { count: quantity, unit });
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    await updatePantry();
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/home');
  };

  const handleEdit = (item) => {
    setCurrentEditItem(item);
    setItemName(item.name);
    setItemQuantity(item.count);
    setItemUnit(item.unit || '');
    handleEditOpen();
  };

  return (
    <Box
      width='100vw'
      height='100vh'
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <Box className="background-animation" />
      <NavBar handleLogout={handleLogout} /> 
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ gap: 4, padding: 4, textAlign: 'center', backgroundColor: 'transparent' }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            marginBottom: 4,
            backgroundColor: '#33292900',
            color: '#674B4B'
          }}
        >
          Add Items
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Add Item
            </Typography>
            <Stack width='100%' spacing={2} mt={2}>
              <TextField
                id='outlined-basic'
                label='Item'
                variant='outlined'
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                id='outlined-basic'
                label='Quantity'
                variant='outlined'
                fullWidth
                value={itemQuantity}
                onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                InputProps={{ inputProps: { min: 1 } }}
              />
              <TextField
                id='outlined-basic'
                label='Unit (e.g., lbs, oz, etc.)'
                variant='outlined'
                fullWidth
                value={itemUnit}
                onChange={(e) => setItemUnit(e.target.value)}
                placeholder='Optional: lbs, oz, etc.'
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName, itemQuantity, itemUnit);
                  setItemName('');
                  setItemQuantity(1);
                  setItemUnit('');
                  handleClose();
                }}
                sx={{
                  backgroundColor: '#33292900',
                  color: '#674B4B'
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby='modal-edit-title'
          aria-describedby='modal-edit-description'
        >
          <Box sx={style}>
            <Typography id='modal-edit-title' variant='h6' component='h2'>
              Edit Item
            </Typography>
            <Stack width='100%' spacing={2} mt={2}>
              <TextField
                id='edit-item'
                label='Item'
                variant='outlined'
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                id='edit-quantity'
                label='Quantity'
                variant='outlined'
                fullWidth
                value={itemQuantity}
                onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                InputProps={{ inputProps: { min: 1 } }}
              />
              <TextField
                id='edit-unit'
                label='Unit (e.g., lbs, oz, etc.)'
                variant='outlined'
                fullWidth
                value={itemUnit}
                onChange={(e) => setItemUnit(e.target.value)}
                placeholder='Optional: lbs, oz, etc.'
              />
              <Button
                variant="contained"
                onClick={() => {
                  editItem(currentEditItem.name, itemQuantity, itemUnit);
                  setItemName('');
                  setItemQuantity(1);
                  setItemUnit('');
                  handleEditClose();
                }}
                sx={{
                  backgroundColor: '#33292900',
                  color: '#674B4B'
                }}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Typography variant={'h2'} color={'#333'} sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)', marginBottom: 4 }}>
          Pantry Items
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: '90%', maxHeight: '60vh' }}>
          <Table stickyHeader aria-label="pantry items table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pantry.map((item) => (
                <TableRow key={item.name}>
                  <TableCell component="th" scope="row">
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </TableCell>
                  <TableCell align="right">{item.count}</TableCell>
                  <TableCell align="right">{item.unit || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleEdit(item)} sx={{ marginRight: 1 }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => removeItem(item.name)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
