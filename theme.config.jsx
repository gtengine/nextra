import React from "react";
import { useRouter } from "next/router";

const config = {
  logo: (
    <>
      <svg
        width="32"
        height="32"
        viewBox="0 0 144 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_510_6)">
          <path
            d="M108.411 31.0308L104.919 34.523C86.9284 52.5134 57.7601 52.5134 39.7697 34.523L36.2775 31.0308C34.8287 29.582 32.4797 29.582 31.0309 31.0308C29.5821 32.4796 29.5821 34.8286 31.0309 36.2773L34.5231 39.7695C52.5135 57.76 52.5135 86.9283 34.5231 104.919L31.0309 108.411C29.5821 109.86 29.5821 112.209 31.0309 113.657C32.4797 115.106 34.8287 115.106 36.2775 113.657L39.7697 110.165C57.7601 92.1748 86.9284 92.1748 104.919 110.165L108.411 113.657C109.86 115.106 112.209 115.106 113.658 113.657C115.106 112.209 115.106 109.86 113.658 108.411L110.165 104.919C92.1749 86.9283 92.1749 57.76 110.165 39.7695L113.658 36.2773C115.106 34.8286 115.106 32.4796 113.658 31.0308C112.209 29.582 109.86 29.582 108.411 31.0308Z"
            fill="black"
            stroke="black"
            strokeWidth="4"
          />
        </g>
        <defs>
          <clipPath id="clip0_510_6">
            <rect width="144" height="144" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>기억하기 위한 기록</span>
    </>
  ),
  project: {
    link: "https://github.com/gtengine/nextra",
  },
  footer: {
    text: () => {
      const router = useRouter();
      return (
        !(router.asPath === "/") && (
          <span>
            Copyright {new Date().getFullYear()}.{" "}
            <a href="https://github.com/gtengine/nextra" target="_blank">
              Kyoungtae Min.{" "}
            </a>
            all right reserved.
          </span>
        )
      );
    },
  },
  editLink: {
    text: "",
  },
  navigation: false,
};

export default config;