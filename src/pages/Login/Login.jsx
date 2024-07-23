import React, { useEffect, useRef, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login, signup} from '../../firebase'
import lock from '../../assets/lock.png'
import unlock from '../../assets/unlock.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showHidePassword, setShowHidePassword] = useState(true);
  const vertifyPassword = (password) => {
    // regexPassword: Minimum eight characters, at least one uppercase letter,
    // one lowercase letter and one number:
    let regexPassword = new RegExp(
      /((?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$)/
    );
    if (regexPassword.test(password)) {
      return true;
    }
    return false;
  };

  const user_auth = async (event) => {
    // chặn hành vi load lại trang
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="divPassword">
            <input
              // type="text"
              type={showHidePassword ? "password" : "text"}
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                const isValidPw = vertifyPassword(e.target.value);
                isValidPw
                  ? setIsValidPassword(true)
                  : setIsValidPassword(false);
              }}
            />

            {showHidePassword === true ? (
              <img
                src={lock}
                alt=""
                className="lock"
                onClick={() => {
                  setShowHidePassword(false);
                }}
              />
            ) : (
              <img
                src={unlock}
                alt=""
                className="lock"
                onClick={() => {
                  setShowHidePassword(true);
                }}
              />
            )}
          </div>

          {/* contrain password */}
          {isValidPassword === false ? (
            <div className="textAlert">
              Password phải đủ 8 kí tự trong đó ít nhất 1 chữ số, 1 chữ hoa và 1
              chữ thường{" "}
            </div>
          ) : (
            <></>
          )}

          <button
            onClick={user_auth}
            type="submit"
            disabled={!isValidPassword}
            className={isValidPassword === false ? "invalid" : "valid"}
          >
            {signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help ?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix ?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login
