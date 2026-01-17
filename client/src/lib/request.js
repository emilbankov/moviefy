let csrfToken = null;

const buildOptions = (data, method) => {
  const options = {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
    options.headers["Content-Type"] = "application/json";
  }

  if (method !== "GET" && csrfToken) {
    options.headers["X-XSRF-TOKEN"] = csrfToken;
  }

  return options;
};

const request = async (method, url, data) => {
  const response = await fetch(url, {
    ...buildOptions(data, method),
    method,
  });

  const newToken = response.headers.get("X-XSRF-TOKEN");
  if (newToken) csrfToken = newToken;

  if (response.status === 204) return null;

  if (!response.ok) {
    const error = await response.text();
    try {
      const parsed = JSON.parse(error);
      throw new Error(parsed.message || error || response.status);
    } catch (e) {
      throw new Error(error || response.status);
    }
  }

  return response.json();
};

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
