"use client";
import { TEMPLATES } from "@/@types/types";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface PROPS {
  selectedTemplate: TEMPLATES;
  userFormInput: any;
  loading: boolean;
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  const [formData, setFormData] = useState<any>();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("FormData: ", formData);
    userFormInput(formData);
  };

  return (
    <>
      <div className=" p-5 shadow-lg border rounded-lg">
        <Image src={selectedTemplate.icon} alt="icon" height={70} width={70} />
        <h2 className=" font-bold text-2xl mb-2">{selectedTemplate.name}</h2>
        <p className=" text-gray-500 text-sm">{selectedTemplate.desc}</p>

        <form className=" mt-6" onSubmit={handleSubmit}>
          {selectedTemplate?.form.map((item, index) => (
            <>
              <div key={index} className=" my-2 flex flex-col gap-3 mb-7">
                <label htmlFor="" className=" font-bold">
                  {item.label}
                </label>
                {item.field === "input" ? (
                  <Input
                    className=" bg-black "
                    name={item.name}
                    required={item?.required}
                    onChange={handleInputChange}
                  />
                ) : item.field === "textarea" ? (
                  <Textarea
                    className=" bg-black"
                    name={item.name}
                    required={item?.required}
                    onChange={handleInputChange}
                  />
                ) : null}
              </div>
            </>
          ))}
          <Button
            variant={"secondary"}
            className=" w-full py-6"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating" : "Generate"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormSection;
