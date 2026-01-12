let csrfToken = localStorage.getItem('csrf_token') || null;

const buildOptions = (data, method) => {
  const options = {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  if (method !== "GET" && csrfToken) {
    options.headers = {
      ...options.headers,
      "X-XSRF-TOKEN": csrfToken,
    };
  }

  return options;
};

const request = async (method, url, data) => {
  const response = await fetch(url, {
    ...buildOptions(data, method),
    method,
  });

  const newToken = response.headers.get("X-XSRF-TOKEN");
  if (newToken) {
    csrfToken = newToken;
    localStorage.setItem('csrf_token', newToken);
  }

  if (response.status === 204) {
    return {};
  }

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");