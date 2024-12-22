import { NoteType } from "./types";

export const dummyNotes: Note[] = [
  {
    id: "1",
    title: "Shopping List",
    body: "Weekly groceries needed:\n- 1 gallon of milk\n- Dozen eggs\n- Whole grain bread\n- Sharp cheddar cheese\n- Fresh vegetables (carrots, broccoli, spinach)\n- Fruit (apples, bananas)\n- Chicken breast\n- Rice\n- Pasta sauce",
    dateCreated: new Date("2024-01-15"),
    group: "personal",
  },
  {
    id: "2",
    title: "Meeting Notes",
    body: "Project Status Meeting - Q1 Planning\n\nKey Points:\n- Review current project timeline\n- Discuss resource allocation for next sprint\n- Team capacity planning\n- Budget review for Q1\n- Upcoming milestones and deadlines\n\nAction items:\n- Schedule follow-up with stakeholders\n- Prepare resource allocation document\n- Update project timeline",
    dateCreated: new Date("2024-01-16"),
    group: "work",
  },
  {
    id: "3",
    title: "Book Ideas",
    body: "Novel Outline:\n\nChapter 1: Introduction to main character\n- Character background and personality\n- Initial conflict introduction\n- Setting description\n\nChapter 2: Plot development\n- First major plot point\n- Character relationships\n- Mystery element introduction\n\nChapter 3: Rising Action\n- Conflict escalation\n- New character introduction",
    dateCreated: new Date("2024-01-14"),
    group: "creative",
  },
  {
    id: "4",
    title: "Workout Plan",
    body: "Weekly Exercise Schedule:\n\nMonday: Upper Body\n- Bench press: 3x10\n- Shoulder press: 3x12\n- Pull-ups: 3 sets\n- Bicep curls: 3x15\n\nTuesday: Lower Body\n- Squats: 4x10\n- Deadlifts: 3x8\n- Leg press: 3x12\n\nWednesday: Cardio\n- 30 min running\n- 15 min HIIT\n- 10 min cool down",
    dateCreated: new Date("2024-01-17"),
    group: "health",
  },
  {
    id: "5",
    title: "Travel Plans",
    body: "Summer Vacation Planning:\n\nTo-Do List:\n1. Book flights to Barcelona\n2. Reserve hotel in city center\n3. Create detailed itinerary\n\nPlaces to Visit:\n- Sagrada Familia\n- Park Güell\n- Las Ramblas\n- Gothic Quarter\n\nPacking List:\n- Passport\n- Travel adapter\n- Camera\n- Comfortable walking shoes",
    dateCreated: new Date("2024-01-18"),
    group: "personal",
  },
];
