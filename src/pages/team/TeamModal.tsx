"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const teamSchema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  leadName: z.string().min(2, "Lead name is required"),
  members: z.array(z.string().min(1, "Member name required")).min(1, "At least 1 member required"),
});

export type TeamForm = z.infer<typeof teamSchema>;

interface TeamModalProps {
  initialData?: TeamForm;
  onClose: () => void;
  onSave: (data: TeamForm) => void;
}

export function TeamModal({ initialData, onClose, onSave }: TeamModalProps) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<TeamForm>({
    resolver: zodResolver(teamSchema),
    defaultValues: initialData || { teamName: "", leadName: "", members: [""] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "members" });

  const handleSave = (data: TeamForm) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Team" : "Add Team"}</h2>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Team Name</label>
            <input {...register("teamName")} className="mt-1 block w-full border rounded px-3 py-2" />
            {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Team Lead</label>
            <input {...register("leadName")} className="mt-1 block w-full border rounded px-3 py-2" />
            {errors.leadName && <p className="text-red-500 text-sm">{errors.leadName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Team Members</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2 items-center">
                <input
                  {...register(`members.${index}` as const)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder={`Member ${index + 1}`}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-indigo-600 hover:underline"
              onClick={() => append("")}
            >
              + Add Member
            </button>
            {errors.members && <p className="text-red-500 text-sm mt-1">{errors.members.message}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
