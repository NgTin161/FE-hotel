import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const steps = [
  { title: 'Thông tin', content: 'First-content' },
  { title: 'Dịch vụ', content: 'Second-content' },
];

const AddHotel = () => {
  const [current, setCurrent] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [street, setStreet] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState({});
  const [selectedDistances, setSelectedDistances] = useState({});

  useEffect(() => {
    axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`)
      .then(response => setProvinces(response.data.data))
      .catch(error => console.error("There was an error fetching the provinces!", error));
  }, []);

  const handleProvinceChange = (event) => {
    const value = event.target.value;
    const province = provinces.find(province => province.id === parseInt(value))?.name || '';
    setSelectedProvince(province);
    axios.get(`https://esgoo.net/api-tinhthanh/2/${value}.htm`)
      .then(response => {
        setDistricts(response.data.data);
        setWards([]);
        setSelectedDistrict('');
        setSelectedWard('');
      })
      .catch(error => console.error("There was an error fetching the districts!", error));
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    const district = districts.find(district => district.id === parseInt(value))?.name || '';
    setSelectedDistrict(district);
    axios.get(`https://esgoo.net/api-tinhthanh/3/${value}.htm`)
      .then(response => {
        setWards(response.data.data);
        setSelectedWard('');
      })
      .catch(error => console.error("There was an error fetching the wards!", error));
  };

  const handleWardChange = (event) => {
    const value = event.target.value;
    const ward = wards.find(ward => ward.id === parseInt(value))?.name || '';
    setSelectedWard(ward);
  };

  const handleStreetChange = (event) => setStreet(event.target.value);

  useEffect(() => {
    const address = `${street ? street + ", " : ""}${selectedWard ? selectedWard + ", " : ""}${selectedDistrict ? selectedDistrict + ", " : ""}${selectedProvince}`;
    setFormValues(prevValues => ({ ...prevValues, specificAddress: address }));
  }, [selectedProvince, selectedDistrict, selectedWard, street]);

  const handleAmenityCheckboxChange = (label) => (event) => {
    const checkedValues = [...event.target.selectedOptions].map(option => option.value);
    setSelectedAmenities({
      ...selectedAmenities,
      [label]: checkedValues,
    });
  };

  const handleDistanceChange = (field) => (event) => {
    setSelectedDistances({
      ...selectedDistances,
      [field]: event.target.value,
    });
  };

  const handleNext = () => setCurrent(current + 1);
  const handlePrev = () => setCurrent(current - 1);

  const handleFinish = (event) => {
    event.preventDefault();
    console.log({ ...formValues, services: selectedAmenities, distances: selectedDistances });
  };

  const amenityOptions = [
    { label: 'Phương tiện đi lại', options: ['Cho thuê xe hơi', 'Cho thuê xe máy', 'Bãi đỗ xe', 'Đưa/đón sân bay'] },
    { label: 'Giải trí, thể thao', options: ['Có hồ bơi', 'Sân tennis', 'Phòng gym'] },
    { label: 'Dịch vụ lễ tân', options: ['Lễ tân 24/24', 'Trợ giúp khác'] },
    { label: 'Dịch vụ lau dọn', options: ['Dọn phòng hằng ngày', 'Giặt là', 'Ủi đồ'] },
    { label: 'Hỗ trợ người khuyết tật', options: ['Có lối đi người khuyết tật', 'Nhà vệ sinh riêng'] },
    { label: 'Vật nuôi', options: ['Được mang vật nuôi'] },
    { label: 'Trẻ em', options: ['Được mang theo trẻ em'] },
    { label: 'Dịch vụ nhà hàng', options: ['Bữa sáng', 'Bữa trưa', 'Buổi tối', 'Quầy bar', 'Sân thượng'] },
    { label: 'Tiện ích tổng quát', options: ['Internet miễn phí', 'Có thang máy', 'Ban công view đẹp', 'Điều hòa', 'Bảo vệ 24/24'] },
  ];

  const distanceOptions = [
    { label: 'Cách trung tâm thành phố', field: 'cityCenter' },
    { label: 'Cách sân bay', field: 'airport' },
    { label: 'Cách biển', field: 'beach' },
  ];

  return (
    <div className="container mt-4">
      <Row className="mb-4">
        <Col>
          <div className="steps d-flex justify-content-around">
            {steps.map((step, index) => (
              <div key={index} className={`step ${current === index ? 'active' : ''}`}>
                {step.title}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleFinish}>
        {current === 0 && (
          <>
            <Form.Group controlId="hotelName">
              <Form.Label>Tên khách sạn</Form.Label>
              <Form.Control
                type="text"
                name="hotelName"
                required
                value={formValues.hotelName || ''}
                onChange={e => setFormValues({ ...formValues, hotelName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="stars">
              <Form.Label>Sao</Form.Label>
              <Form.Control
                as="select"
                name="stars"
                required
                value={formValues.stars || ''}
                onChange={e => setFormValues({ ...formValues, stars: e.target.value })}
              >
                {[1, 2, 3, 4, 5].map(star => (
                  <option key={star} value={star}>{star}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="province">
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Form.Control as="select" onChange={handleProvinceChange}>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map(province => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="district">
                  <Form.Label>Quận/Huyện</Form.Label>
                  <Form.Control as="select" onChange={handleDistrictChange}>
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="ward">
                  <Form.Label>Phường/Xã</Form.Label>
                  <Form.Control as="select" onChange={handleWardChange}>
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map(ward => (
                      <option key={ward.id} value={ward.id}>{ward.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="street">
                  <Form.Label>Số/Tên đường</Form.Label>
                  <Form.Control type="text" onChange={handleStreetChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="specificAddress">
              <Form.Label>Địa chỉ cụ thể</Form.Label>
              <Form.Control type="text" value={formValues.specificAddress || ''} readOnly />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="checkInTime">
                  <Form.Label>Giờ nhận phòng</Form.Label>
                  <Form.Control type="time" name="checkInTime" required onChange={e => setFormValues({ ...formValues, checkInTime: e.target.value })} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="checkOutTime">
                  <Form.Label>Giờ trả phòng</Form.Label>
                  <Form.Control type="time" name="checkOutTime" required onChange={e => setFormValues({ ...formValues, checkOutTime: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="description">
              <Form.Label>Mô tả khách sạn</Form.Label>
              {/* <Editor
                apiKey="YOUR_TINYMCE_API_KEY"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={(content) => setFormValues({ ...formValues, description: content })}
              /> */}
            </Form.Group>
            <Form.Group controlId="upload">
              <Form.Label>Upload hình ảnh khách sạn</Form.Label>
              <Form.File
                id="custom-file"
                label="Chọn file"
                custom
                multiple
                accept=".jpg,.jpeg,.png,.gif"
                onChange={(event) => console.log(event.target.files)}
              />
            </Form.Group>
          </>
        )}
        {current === 1 && (
          <>
            <Form.Group controlId="services">
              <Form.Label>Chọn tiện nghi của khách sạn:</Form.Label>
              {amenityOptions.map((option, index) => (
                <Form.Group key={index} controlId={option.label}>
                  <Form.Label>{option.label}</Form.Label>
                  {option.options.map((subOption, subIndex) => (
                    <Form.Check
                      key={subIndex}
                      type="checkbox"
                      label={subOption}
                      value={subOption}
                      onChange={handleAmenityCheckboxChange(option.label)}
                    />
                  ))}
                </Form.Group>
              ))}
            </Form.Group>
            <Form.Group controlId="distances">
              <Form.Label>Thông tin hữu ích:</Form.Label>
              <Form.Group controlId="distance">
                <Form.Label>Khoảng cách:</Form.Label>
                {distanceOptions.map((option, index) => (
                  <InputGroup className="mb-3" key={index}>
                    <InputGroup.Text>{option.label}</InputGroup.Text>
                    <Form.Control
                      type="number"
                      min={0}
                      onChange={handleDistanceChange(option.field)}
                      suffix="m"
                    />
                  </InputGroup>
                ))}
              </Form.Group>
            </Form.Group>
          </>
        )}
        <Row className="mt-3">
          <Col>
            {current > 0 && (
              <Button variant="secondary" onClick={handlePrev}>Về trước</Button>
            )}
          </Col>
          <Col className="text-right">
            {current < steps.length - 1 && (
              <Button variant="primary" onClick={handleNext}>Tiếp tục</Button>
            )}
            {current === steps.length - 1 && (
              <Button variant="success" type="submit">Hoàn thành</Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddHotel;
