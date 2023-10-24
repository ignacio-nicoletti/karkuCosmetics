import axios from "axios";

export const getUserDetail = async (uid, token) => {
  try {
    let response;
    response = await axios.get(`http://localhost:3001/user/${uid}`,{
      headers: { "user-token": token },
    });
    if (!response.data) {
      response = await axios.get(`http://localhost:3001/admin/${uid}`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const PutUser = async (uid, value, token) => {
  try {

    let response;
    response = await axios.put(`http://localhost:3001/user/${uid}`, value, {
      headers: { "user-token": token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const ConfirmEmail = async (uid, value) => {
  try {
    let response;
    response = await axios.put(
      `http://localhost:3001/user/confirmemail/${uid}`,
      { value }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const UpdatePassword = async (value) => {
  //value puede recibir un email o password
  try {
    await axios.post(`http://localhost:3001/user/updatepassword`, value);
  } catch (error) {
    console.log(error);
  }
};

export const resendConfirmationEmail = async (emailUser) => {
  try {
    await axios.post(`http://localhost:3001/email/reconfirmemail`, {
      emailUser,
    });
  } catch (error) {
    console.log(error);
  }
};
