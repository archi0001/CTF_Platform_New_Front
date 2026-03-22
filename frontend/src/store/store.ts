import type { IUser } from "@/models/response/IUser";
import { makeAutoObservable, action, runInAction } from "mobx";
import AuthService from "@/services/AuthService";
import type { RegisterRequest } from "@/models/request/IRegister";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  registrationForm: RegisterRequest = {
    nickname: "",
    lastname: "",
    firstname: "",
    secondname: "",
    university: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };

  constructor() {
    makeAutoObservable(this, {
      login: action,
      register: action,
      logout: action,
      checkAuth: action,
      setAuth: action,
      setUser: action,
      setLoading: action,
      setRegistrationField: action,
      resetRegistrationForm: action,
    });
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      this.setLoading(true);
      const response = await AuthService.login(email, password);
      runInAction(() => {
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
        this.setLoading(false);
      });
      return true;
    } catch {
      runInAction(() => {
        this.setLoading(false);
      });
      return false;
    }
  }

  setRegistrationField<K extends keyof RegisterRequest>(
    field: K,
    value: RegisterRequest[K]
  ) {
    this.registrationForm[field] = value;
  }

  resetRegistrationForm() {
    this.registrationForm = {
      nickname: "",
      lastname: "",
      firstname: "",
      secondname: "",
      university: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    };
  }

  async register() {
    try {
      if (
        this.registrationForm.password !== this.registrationForm.confirmPassword
      ) {
        console.log("Пароли не совпадают");
        return;
      }
      this.setLoading(true);
      const response = await AuthService.register(this.registrationForm);
      runInAction(() => {
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
        this.resetRegistrationForm();
        this.setLoading(false);
      });
      return true;
    } catch {
      runInAction(() => {
        this.setLoading(false);
      });
      return false;
    }
  }

  async logout() {
    try {
      this.setLoading(true);
      await AuthService.logout();
      runInAction(() => {
        localStorage.removeItem("token");
        this.setAuth(false);
        this.setUser({} as IUser);
        this.setLoading(false);
      });
    } catch {
      runInAction(() => {
        this.setLoading(false);
      });
      console.log("Ошибка выхода");
    }
  }

  async checkAuth() {
    this.setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      runInAction(() => {
        this.setAuth(false);
        this.setUser({} as IUser);
        this.setLoading(false);
      });
      return;
    }

    try {
      const response = await AuthService.refresh();
      runInAction(() => {
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
        this.setLoading(false);
      });
    } catch {
      runInAction(() => {
        this.setAuth(false);
        this.setUser({} as IUser);
        localStorage.removeItem("token");
        this.setLoading(false);
      });
    }
  }
}
