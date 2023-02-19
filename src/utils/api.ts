import {getStoredAccessToken, clearAccessToken} from "./token";
import {TodoItem, User} from "../types/user";

interface UserResponse {
  id: number;
  email: string;
}

const baseApi='http://localhost:3001';

async function apiRequest(path: string, method: string, body?: any): Promise<Response> {
  const accessToken=getStoredAccessToken();
  const headers: HeadersInit={
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"]=`Bearer ${accessToken}`;
  }

  const response=await fetch(baseApi + `${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return response;
}

type GetUserDataResponse={
  user: User
}

export async function getUser(): Promise<User | null> {
  const response=await apiRequest("/user", "GET");

  if (response.status === 401) {
    return null;
  }

  const data: GetUserDataResponse=await response.json();

  return data.user;
}

type LoginResponse={
  token: string;
}

export async function loginUser(email: string, password: string): Promise<string | null> {
  const response=await apiRequest("/login", "POST", {
    email, password
  });

  if (response.status === 401) {
    return null;
  }

  const data: LoginResponse=await response.json();

  return data.token;
}

type RegisterResponse={
  user: UserResponse
}
type BadRequestResponse={
  message: string;
}

export async function registerUser(name: string, email: string, password: string): Promise<string> {
  const response = await apiRequest("/signup", "POST", {
    name,
    email,
    password
  });

  const data: RegisterResponse | BadRequestResponse = await response.json();
  if (response.status === 400 || response.status === 409) {
    throw new Error((data as BadRequestResponse).message);
  }
  return (data as RegisterResponse).user.email;
}

export async function getTodos(): Promise<TodoItem[] | null> {
  const response=await apiRequest("/api/todo", "GET");

  if (response.status === 401) {
    return null;
  }

  return await response.json();
}

export async function handleComplete(id: number, completed: boolean): Promise<TodoItem[] | null> {
  const response=await apiRequest("/api/todo/" + id, "PATCH", {
    completed: !completed
  });

  if (response.status === 401) {
    return null;
  }

  return await response.json();
}

export async function handleDelete(id: number): Promise<void> {
  await apiRequest("/api/todo/" + id, "DELETE");
}

export async function handleAddTodo(description: string): Promise<TodoItem | null> {
  const response = await apiRequest("/api/todo", "POST", {
    description,
    completed: false,
  });

  if (response.status === 401) {
    return null;
  }

  return await response.json();
}


export async function handleLogout(): Promise<void> {
  // Revoke token to increase security, incase token has been hijack
  await apiRequest("/logout", "POST");
  // Remove the access token from local storage
  clearAccessToken();
}
