import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import React from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_PRODUCT_STATE = {
  name: "",
  price: "",
  media: "",
  description: ""
};
function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT_STATE);

  const [mediaPreview, setMediaPreview] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const { name, price, media, description } = product;
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT_STATE);

      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "reactReserveMCM");
    data.append("cloud_name", "mcmbonu");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    return response.data.url;
  }
  return (
    <>
      <Header as="h2" block>
        {" "}
        <Icon color="orange" name="add"></Icon> Create New Product
      </Header>
      <Form
        success={success}
        loading={loading}
        error={Boolean(error)}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        ></Message>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            required
            value={name}
            onChange={handleChange}
          ></Form.Field>
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            required
            value={price}
            onChange={handleChange}
          ></Form.Field>
          <Form.Field
            control={Input}
            name="media"
            label="Media"
            content="Select Image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          ></Form.Field>
        </Form.Group>
        {media && (
          <Image size="small" rounded centered src={mediaPreview}></Image>
        )}
        <Form.Field
          control={TextArea}
          name="description"
          required
          label="Description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
        ></Form.Field>
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
        ></Form.Field>
      </Form>
    </>
  );
}

export default CreateProduct;
