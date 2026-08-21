import { useState } from "react";

import {
  login,
  register,
} from "../api/authApi";

import type {
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export function useAuth() {
  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    data: LoginRequest
  ) {
    setLoading(true);

    try {
      const response =
        await login(data);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      return response;
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(
    data: RegisterRequest
  ) {
    setLoading(true);

    try {
      const response =
        await register(data);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      return response;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  }

  return {
    loading,
    login: handleLogin,
    register: handleRegister,
    logout,
  };
}