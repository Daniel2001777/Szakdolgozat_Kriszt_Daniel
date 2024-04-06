import React, { useEffect, useState } from "react";
import styles from "./Data.module.css";
import axios from "../../axios/axiosInstance.js";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

export default function Data() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post("/getData");
      setData(response.data);
    } catch (err) {
      console.log("Hiba az adatok lekérdezésénél.", err);
    }
  };

  const changeDateFormat = (date) =>{
    const changeDate = new Date(date);
    const formattedDate = changeDate.toISOString().slice(0, 16);

    return formattedDate;
  }

  const handleItemSelect = (id) => {
    if(selectedItem.includes(id)){
      setSelectedItem(selectedItem.filter(itemId => itemId !== id));
    }else{
      setSelectedItem([...selectedItem, id]);
    }
  }

  const handleDelete = async () => {
    try{
      await axios.delete('/deleteRow', {data: {id: selectedItem}});
      getData();
      setSelectedItem([]);
    }catch(err){
      console.log("Hiba az adatok törlésénél.", err);
    }
  }

  console.log(selectedItem);

  return (
    <div className={styles.container}>
      <Table>
        <thead>
          <tr>
            <th><Button variant="dark" onClick={handleDelete}>Törlés</Button></th>
            <th>Id</th>
            <th>Autónév</th>
            <th>Név</th>
            <th>Email</th>
            <th>Telefonszám</th>
            <th>Irányítószám</th>
            <th>Város</th>
            <th>Utcanév</th>
            <th>Házszám</th>
            <th>Kezdő dátum</th>
            <th>Végző dátum</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleItemSelect(item.id)}
                  checked={selectedItem.includes(item.id)}
                />
              </td>
              <td>
                {item.id}
              </td>
              <td>
                {item.auto_name}
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.tel}</td>
              <td>{item.postal_code}</td>
              <td>{item.city}</td>
              <td>{item.street_name}</td>
              <td>{item.house_number}</td>
              <td>{changeDateFormat(item.start_date)}</td>
              <td>{changeDateFormat(item.end_date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
