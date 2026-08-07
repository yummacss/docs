import Combobox, { type ComboboxItem } from "./combobox";

export default function ComboboxHelper() {
  return (
    <Combobox
      items={users}
      label={
        <>
          Assign member <span className="c-red-5">*</span>
        </>
      }
      placeholder="Search members"
      description="Only project members can be assigned."
      emptyMessage="No users found."
    />
  );
}

const users: ComboboxItem[] = [
  "Adrian",
  "Aidan",
  "Jade",
  "Jessica",
  "Jocelyn",
  "John",
  "Katherine",
  "Liam",
  "Liliana",
  "Maria",
  "Melanie",
  "Noah",
].map((label) => ({ label }));
