import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.filters.name;

export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter], //[]-від яких селекторів ми залежимо (lect2 45:00)
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
    )
);
