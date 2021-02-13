import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./create-user.scss";

import HttpMethod from "../../enum/http.request.enum";
import Request from "../../network/http.request";
import IUser from "../../interfaces/user.interface";
import validationError from "../../types/validation.errors.type";
import { formatValidationMessages } from "../helper-methods";
import UserSchema from "./validation.schema";

function CreateUserForm() {
  const [user, setUser] = useState({}) as [IUser, SetStateAction<any>];
  const [validationErrors, setValidationErrors] = useState({}) as [
    validationError,
    Dispatch<SetStateAction<validationError>>
  ];
  const history = useHistory();

  const performValidation = () => {
    const value = UserSchema.validate(user, { abortEarly: false });

    if (value?.error?.details) {
      console.log(value?.error.details);
      const messages = formatValidationMessages(value.error.details);
      setValidationErrors(messages);
      return false;
    }
    return true;
  };

  const showValidationMessage = (key: string) => {
    return <span className="error-msg">{validationErrors[key]}</span>;
  };

  const submit = async (e: any) => {
    e.preventDefault();
    console.log(user);
    // I'm not proud of this one, but the deadline was tough
    if (
      !!user?.hiringdate &&
      new Date(user.birthdate).getTime() >= new Date(user?.hiringdate).getTime()
    ) {
      setValidationErrors({
        birthdate: "Birth date must be before the hiring date",
      });
      return;
    }

    if (performValidation()) {
      await createUser();
      //
      history.push("/view/users");
    }
  };

  const createUser = async () => {
    console.log("Creating user..");
    return await Request({
      endpoint: "users",
      type: HttpMethod.POST,
      data: user,
    });
  };

  const onChange = (key: string, value: any) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <Container className="table-container">
      <Row>
        <Col lg={12}>
          <h2 className="title mb-3">Create a new user</h2>
        </Col>
      </Row>
      <Form onSubmit={submit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full name"
            onChange={(e) => onChange("fullName", e.target.value)}
          />
          {showValidationMessage("fullName")}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => onChange("email", e.target.value)}
          />
          {showValidationMessage("email")}
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {showValidationMessage("phone")}
        </Form.Group>

        <Form.Group controlId="altPhone">
          <Form.Label>Alternate Phone (Optional)</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              onChange("alternateInfo", {
                ...user.alternateInfo,
                phone: e.target.value,
              })
            }
          />
          {showValidationMessage("altPhone")}
        </Form.Group>

        <Form.Group controlId="birhtDate">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => onChange("birthdate", e.target.value)}
          />
          {showValidationMessage("birthdate")}
        </Form.Group>

        <Form.Group controlId="hiringDate">
          <Form.Label>Hiring date (Optional)</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => onChange("hiringdate", e.target.value)}
          />
          {showValidationMessage("hiringdate")}
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => onChange("address", e.target.value)}
          />
          {showValidationMessage("address")}
        </Form.Group>

        <Form.Group controlId="altAddress">
          <Form.Label>Alternate address (Optional)</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              onChange("alternateInfo", {
                ...user.alternateInfo,
                address: e.target.value,
              })
            }
          />
          {showValidationMessage("altAddress")}
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default CreateUserForm;
