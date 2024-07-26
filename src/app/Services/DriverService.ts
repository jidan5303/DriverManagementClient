import { NextResponse } from "next/server";
import { baseURL } from "../Helpers/route";

export async function getAllDriverInfo() {
    const response = await fetch(baseURL + "/api/getAllDriverInfo");
    const data = await response.json();
    return NextResponse.json(data);
}

export async function saveDriverInfo(data: any) {
    const response = await fetch(baseURL + "/api/saveDriverInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return NextResponse.json(await response.json());
}

export async function editDriverInfo(data: any) {
    const response = await fetch(baseURL + "/api/editDriverInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return NextResponse.json(await response.json());
}

export async function deleteDriverInfo(data: any) {
    const response = await fetch(baseURL + "/api/deleteDriverInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return NextResponse.json(await response.json());
}