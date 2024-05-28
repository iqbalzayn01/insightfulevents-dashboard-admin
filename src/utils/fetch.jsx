import config from '../config';

const BASE_URL = config.base_url;

async function fetchWithToken(url, options = {}) {
  const getToken = localStorage.getItem('token');

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getToken}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.message || 'Login failed');
  }

  return { error: false, data: responseJson.data };
}

async function signup({
  name,
  email,
  password,
  confirmPassword,
  no_telp,
  role,
}) {
  const response = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
      no_telp,
      role,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllUsers() {
  const response = await fetchWithToken(`${BASE_URL}/users`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function updateUsers(id, userData) {
  const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteUser(id) {
  const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function createTalents({ name, email, no_telp }) {
  const response = await fetchWithToken(`${BASE_URL}/create-talents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      no_telp,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllTalents() {
  const response = await fetchWithToken(`${BASE_URL}/talents`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function updateTalents(id, talentData) {
  const response = await fetchWithToken(`${BASE_URL}/talents/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(talentData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteTalent(id) {
  const response = await fetchWithToken(`${BASE_URL}/talents/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function createNewThreads({ title, body, category }) {
  const response = await fetchWithToken(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, category }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getThread(id) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function upVoteThread(id) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}/up-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function downVoteThread(id) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}/down-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function neutralThreadVote(id) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${id}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function createComment(id, content) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function upVoteComment(id, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${id}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function downVoteComment(id, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${id}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function neutralCommentVote(id, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${id}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getLeaderboards() {
  const response = await fetchWithToken(`${BASE_URL}/leaderboards`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  login,
  signup,
  getUserLogged,
  getAllUsers,
  updateUsers,
  deleteUser,
  createTalents,
  getAllTalents,
  updateTalents,
  deleteTalent,
  //
  createNewThreads,
  getThread,
  upVoteThread,
  downVoteThread,
  neutralThreadVote,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralCommentVote,
  getLeaderboards,
};
