import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../creation-form/create-user.scss";

import HttpMethod from "../../enum/http.request.enum";
import Request from "../../network/http.request";
import IUser from "../../interfaces/user.interface";
import validationError from "../../types/validation.errors.type";
import {
  fetchUserById,
  formatValidationMessages,
  performValidation,
  showValidationMessage,
} from "../helper-methods";
import UserSchema from "../creation-form/validation.schema";

function EditUserForm(props: any) {
  const [user, setUser] = useState({}) as [IUser, SetStateAction<any>];
  const [validationErrors, setValidationErrors] = useState({}) as [
    validationError,
    Dispatch<SetStateAction<validationError>>
  ];
  const history = useHistory();

  const submit = async (e: any) => {
    e.preventDefault();

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

    const validation = performValidation(UserSchema, user);
    if (Object.keys(validation).length < 1) {
      await EditUserForm();
      //
      history.push(`/view/users/${user._id}`);
    } else {
      setValidationErrors(validation);
      console.log(validation);
    }
  };

  const EditUserForm = async () => {
    console.log("Editing user..");
    return await Request({
      endpoint: `users/${user._id}`,
      type: HttpMethod.PATCH,
      data: user,
    });
  };

  const onLoad = async () => {
    const userId = props.match.params.userId;
    if (!!userId) {
      const user = await fetchUserById(userId);
      setUser(user);
    } else {
      history.push("/view/users");
    }
  };

  const onChange = (key: string, value: any) => {
    setUser({ ...user, [key]: value });
  };
  console.log(user);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Container className="table-container">
      <Row>
        <Col lg={12}>
          <h2 className="title mb-3">Edit user</h2>
        </Col>
      </Row>
      <Form onSubmit={submit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full name"
            defaultValue={user.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
          {showValidationMessage("fullName", validationErrors)}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={user.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          {showValidationMessage("email", validationErrors)}
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            defaultValue={user.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {showValidationMessage("phone", validationErrors)}
        </Form.Group>

        <Form.Group controlId="altPhone">
          <Form.Label>Alternate Phone (Optional)</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user?.alternateInfo?.phone && "-"}
            onChange={(e) =>
              onChange("alternateInfo", {
                ...user.alternateInfo,
                phone: e.target.value,
              })
            }
          />
          {showValidationMessage("altPhone", validationErrors)}
        </Form.Group>

        <Form.Group controlId="birhtDate">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            defaultValue={user?.birthdate?.slice(0, 10)}
            onChange={(e) => onChange("birthdate", e.target.value)}
          />
          {showValidationMessage("birthdate", validationErrors)}
        </Form.Group>

        <Form.Group controlId="hiringDate">
          <Form.Label>Hiring date (Optional)</Form.Label>
          <Form.Control
            type="date"
            defaultValue={user.hiringdate ? user.hiringdate.slice(0, 10) : ""}
            onChange={(e) => onChange("hiringdate", e.target.value)}
          />
          {showValidationMessage("hiringdate", validationErrors)}
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.address}
            onChange={(e) => onChange("address", e.target.value)}
          />
          {showValidationMessage("address", validationErrors)}
        </Form.Group>

        <Form.Group controlId="altAddress">
          <Form.Label>Alternate address (Optional)</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user?.alternateInfo?.address && ""}
            onChange={(e) =>
              onChange("alternateInfo", {
                ...user.alternateInfo,
                address: e.target.value,
              })
            }
          />
          {showValidationMessage("altAddress", validationErrors)}
        </Form.Group>

        <Button variant="warning" type="submit">
          Edit
        </Button>
      </Form>
    </Container>
  );
}

export default EditUserForm;
