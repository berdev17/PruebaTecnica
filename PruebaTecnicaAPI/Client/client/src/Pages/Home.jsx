import React from "react";
import { Carousel, Card, Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Home = () => {
    const imageUrls = [
        "https://cdn.pixabay.com/photo/2016/10/28/13/09/usa-1777986_1280.jpg",
        "https://media.istockphoto.com/id/2156176090/photo/times-square-in-new-york-city.jpg?s=2048x2048&w=is&k=20&c=42gYc_tKkiB8oW4-oxNKiLFy_vRvRPm6hD94p5muQGs=",
        "https://media.istockphoto.com/id/946087016/photo/aerial-view-of-lower-manhattan-new-york.jpg?s=2048x2048&w=is&k=20&c=Www08BB4-g-9qC5qOyTgLkWm33ZffoXahmrXFJSxRVw=",
        "https://media.istockphoto.com/id/1474651053/photo/moscow-skyline-with-cathedral-of-vasily-the-blessed-and-spasskaya-tower-on-red-square-russia.jpg?s=2048x2048&w=is&k=20&c=Si_5AtPOvZxEwzP3iC1QotXMpw_6gN_6nr-0yrxcBUM=",
        "https://media.istockphoto.com/id/494611794/photo/view-on-bruges.jpg?s=2048x2048&w=is&k=20&c=qenf2D1lAAplhsOzMTJqUfVafwxuJ9Y92aJlXKov3Fo=",
        "https://media.istockphoto.com/id/902966276/photo/kyoto-japan-in-spring.jpg?s=2048x2048&w=is&k=20&c=mg1W2Bl851dx_-J8upYWCKeK6BYco9wwsC32J3aLrhs=",
      ];
  return (
    <div style={{ padding: "20px" }}>
      {/* Título y descripción */}
      <Typography style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title>Bienvenido a la Client App</Title>
        <Paragraph>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        </Paragraph>
      </Typography>

      <Carousel autoplay style={{ marginBottom: "40px" }}>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/11/23/15/14/jars-1853439_1280.jpg"
            alt="Carousel 1"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/1980941684/photo/3d-render-of-fashion-clothing-shop.jpg?s=2048x2048&w=is&k=20&c=wt4rjsGPwwBTUAcAUyC1fTOeGQLpBzDqoT5rXJef8yM="
            alt="Carousel 2"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2015/08/25/11/50/shop-906722_1280.jpg"
            alt="Carousel 3"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
      </Carousel>

            <Row gutter={[16, 16]}>
                {imageUrls.map((url, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                    <Card
                        hoverable
                        cover={<img alt={`Card ${index + 1}`} src={url} />}
                    >
                        <Meta title={`Card ${index + 1}`} description="This is a description for the card." />
                    </Card>
                   </Col>
                ))} 
        </Row>
    </div>
  );
};

export default Home;
