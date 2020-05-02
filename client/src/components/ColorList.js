import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {useHistory} from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" },
  id:''
};

const ColorList = ({ colors, updateColors }) => {
  const history = useHistory()
  console.log('colors in colorList',colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    console.log('color in editColor',color)
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/:${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      console.log('res in saveEdit',res);
      updateColors(colors.map(col =>{if (col.id === colorToEdit.id){return res.data}else{return col}}))
      setEditing(false);
      history.push('/bubble-page')
    })
    .catch(err=>console.log('error in daveedit put', err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('color in deleteColor',color)
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/:${color.id}`)
    .then(res=>{
      console.log('res in deleteColor axios',res)
        updateColors(colors.filter(delColor => delColor.id !== color.id))
        history.push('/bubble-page')
    })
    .catch(err=>console.log('error in deleteColor axios',err))
  };

  const addColor = e =>{
    e.preventDefault();
    const color = {...colorToEdit, id: Date.now()}
    console.log('color in addcolor',color)
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, color)
    .then(res => {
    console.log('res in addColor', res)
    history.push('/bubble-page')})
    .catch(err=>console.log('error in addColor',err))
    
  }
// const handleChanges = e=>{
//   setColorToEdit({...colorToEdit,id:Date.now(), [e.target.name]:e.target.value})
// }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form>
        <input
        type='text'
        name='color'
        placeholder='Color'
        onChange={e =>
          setColorToEdit({ ...colorToEdit, color: e.target.value })
        }
        />
        <input
        type='text'
        name='hex'
        placeholder='Color Hex'
        onChange={e =>
          setColorToEdit({
            ...colorToEdit,
            code: { hex: e.target.value }
          })}/>
          <button onClick={addColor}>new</button>
      </form>
      {/* <button onClick={addColor}>Add New Color</button> */}
    </div>
  );
};

export default ColorList;
