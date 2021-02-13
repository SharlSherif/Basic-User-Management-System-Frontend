import React, { useEffect, useState, SetStateAction } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import GeneralHelper from "../../helpers/general.helper";
import IUser from "../../interfaces/user.interface";
import { fetchUserById } from "../helper-methods";

function UserViewTable(props: any) {
  const [user, setUser] = useState({}) as [IUser, SetStateAction<any>];
  const history = useHistory();

  const onLoad = async () => {
    const userId = props.match.params.userId;
    if (!!userId) {
      const user = await fetchUserById(userId);
      setUser(user);
    } else {
      history.push("/view/users");
    }
  };
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Container className="table-container">
      <Row>
        <Col lg={12}>
          <h2 className="title mb-3">User</h2>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Birth Date</th>
            <th>Hiring Date</th>
            <th>Address</th>
            <th>Alt. Address</th>
            <th>Alt. Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{GeneralHelper.convertDateToYYYYMMDD(user.birthdate)}</td>
            <td>
              {user.hiringdate
                ? GeneralHelper.convertDateToYYYYMMDD(user.hiringdate)
                : "-"}
            </td>
            <td>{user.address}</td>
            <td>
              {user.alternateInfo?.address ? user.alternateInfo?.address : "-"}
            </td>
            {user.alternateInfo?.phone ? user.alternateInfo?.phone : "-"}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default UserViewTable;
