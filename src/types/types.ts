import React from "react";

export type TChildren = {
    children: React.ReactNode;
    title?: string;
    subTitle?: string;
    description?: string;
};

export type TString = {
    text: string;
}

export type TPassword = {
    placeholder?: string;
}
