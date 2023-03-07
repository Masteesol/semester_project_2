export default "https://marius-backend-general.herokuapp.com/api/";

export async function getApi(path, token = null) {
  try {
    const url = base + path;
    if (token) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return await response.json();
    } else {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
  } catch (error) {
    console.log(`Error message is: ${error}`);
  }
}

/*export async function getApi(path) {
  try {
    const url = base + path;
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}*/

export async function api(data, headers, endPoint = "", method) {
  const url = base + endPoint;
  const options = {
    method: method,
    body: data,
    headers: headers,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);
    if (json.user) {
      console.log("success");
      console.log(json.jwt);
      console.log(json.user);
    }
    if (json.error) {
      console.log("error");
    }
    return { json: json, response: response };
  } catch (error) {
    console.log(error);
  }
}

export function stringify(data) {
  return JSON.stringify({ data: data });
}
