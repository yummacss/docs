import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteHelper() {
  return (
    <Autocomplete
      items={teamMembers}
      label={
        <>
          Assign member <span className="c-red-5">*</span>
        </>
      }
      placeholder="Search members"
      description="Only project members can be assigned."
    />
  );
}

const teamMembers: AutocompleteItem[] = [
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
