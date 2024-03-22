import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function CarCard(props) {
  return (
    <>
      <div className={`${style.col}`}>
        <Link to={`/cars/${props.slug}`} className={style.link}>
          <Card className={style.card}>
            <Card.Img variant="top" src={props.img} className={style.img} />
            <Card.Body>
              <Card.Title style={{
                fontFamily: '"Black Ops One", system-ui',
                fontWeight: "400 !important",
                fontStyle: "normal !important",
              }}>{props.title}</Card.Title>
              <Card.Text>
                {props.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
}
