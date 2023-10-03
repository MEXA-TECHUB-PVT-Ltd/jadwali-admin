import React from "react";

export type TChildren = {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  description?: string;
  link?: string;
};

export type TString = {
  text: string;
};

export type TPassword = {
  placeholder?: string;
};

export type TCommonTable = {
  title: string;
  status?: string;
};
