import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { api } from "../services/api";

const GithubContext = createContext(null);

// Provider, Consumer
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    msg: "",
  });

  const toggleError = (show = false, msg = "") => setError({ show, msg });

  const checkRateRequest = async () => {
    try {
      const { data } = await api.get("/rate_limit");
      const {
        rate: { remaining },
      } = data;

      setRequests(remaining);

      if (remaining === 0) {
        toggleError(true, "Sorry, you have exceeded your hourly rate limit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    try {
      const { data } = await api.get(`/users/${user}`);
      setGithubUser(data);

      const { login, followers_url } = data;
      const [repos, followers] = await Promise.allSettled([
        api.get(`/users/${login}/repos?per_page=100`),
        api.get(followers_url),
      ]);

      handlePromiseResults(repos, setRepos);
      handlePromiseResults(followers, setFollowers);

      setIsLoading(false);
      checkRateRequest();
    } catch (error) {
      toggleError(true, "there is no user with that username");
    }
  };

  const handlePromiseResults = (promise, setter) => {
    if (promise.status === "fulfilled") {
      setter(promise.value.data);
    }
  };

  useEffect(() => {
    checkRateRequest();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
