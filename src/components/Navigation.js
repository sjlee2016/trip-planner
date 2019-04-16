import React from 'react'
import styles from './Navigation.css'
import {Navbar,Nav,Button,NavDropdown,Form,FormControl} from 'react-bootstrap'
const Navigation = (props) => {
    return(
      <div className={styles.Navigation}> 
<Navbar  bg="dark" variant="dark">
  <Navbar.Brand href="#home">Trip Planner</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">홈페이지</Nav.Link>
      <Nav.Link href="/login">로그인</Nav.Link>
      <NavDropdown title="메뉴" id="basic-nav-dropdown">
        <NavDropdown.Item href="/scheduler">플랜 만들기</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">그룹 생성/관리</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Q&A</NavDropdown.Item>
      </NavDropdown>
      <Button type="button" variant="danger">
  알림 <span className="badge badge-light">4</span>
</Button>
    </Nav>
   
    <Form inline>
      <FormControl type="text" placeholder="사용자 찾기" className="mr-sm-2" />
      <Button variant="outline-success">검색</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
</div>
    )
};
export default Navigation