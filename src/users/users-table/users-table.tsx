import React, { useEffect, useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Actions from "../../enum/actions.enum";
import GeneralHelper from "../../helpers/general.helper";
import IUser from "../../interfaces/user.interface";
import Request from "../../network/http.request";
import { Context } from "../../state/store";
import "./users-table.scss";

function UsersTable() {
  const [state, dispatch] = useContext(Context);
  console.log(state);

  const fetchUsersData = async () => {
    const data = await Request({ endpoint: "users" });
    dispatch({
      type: Actions.SET_USERS,
      payload: data,
    });
  };

  useEffect(() => {
    fetchUsersData();

    console.log(state);
  }, []);

  return (
    <Container className="table-container">
      <Row>
        <Col lg={12}>
          <h2 className="title mb-3">Existing Users</h2>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Hiring Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user: IUser, index: number) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{GeneralHelper.convertDateToYYYYMMDD(user.birthdate)}</td>
              <td>
                <Row>
                  <Col lg={3}>
                    <NavLink to={`/view/user/${user._id}`}>View</NavLink>{" "}
                  </Col>
                  <Col lg={3}>
                    <NavLink to={`/edit/user/${user._id}`}>Edit</NavLink>{" "}
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UsersTable;
