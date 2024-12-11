export const tempData = {
  coding: [
    "The current sorting algorithm (Merge Sort) works well for larger datasets, but Quick Sort might perform better for smaller datasets due to its lower overhead. Test both to confirm.",
    "Binary Search Tree operations (insert, search, delete) are O(log n) on average, but they degrade to O(n) if the tree becomes unbalanced. Consider using AVL or Red-Black trees.",
    "For the 'two-sum' problem, handle cases where the array contains duplicate numbers (e.g., [2, 2, 3] with target 4).",
    "Use BFS for shortest path on an unweighted graph and Dijkstra's Algorithm for weighted graphs. Avoid DFS as it may not guarantee the shortest path.",
    "Extract repetitive API calls into a reusable function. This will reduce redundancy and improve maintainability.",
    "Switched from axios to fetch in the front-end because it reduces bundle size. Keep an eye on edge cases where fetch lacks features (e.g., timeout).",
    "Upgraded React from v16 to v18. Ensure all third-party components support the new React version.",
    "Bug: NullPointerException in calculateTotal(). Cause: order.items was null. Fix: Add a null check before looping over items.",
    "Dropdown menu does not close on blur in Safari. Works in Chrome/Firefox. Solution: Add explicit event listener for blur on Safari.",
    "Unit test failing due to async function not resolving. Added await for the promise and ensured the mock function returns a resolved promise.",
    "Binary Search Tree operations (insert, search, delete) are O(log n) on average, but they degrade to O(n) if the tree becomes unbalanced. Consider using AVL or Red-Black trees.\n# BST Insert Function\nclass Node:\ndef __init__(self, value):\nself.value = value\nself.left = None\n\t self.right = None\n\tdef insert(root, value):\nif root is None:\nreturn Node(value)\nif value < root.value:\nroot.left = insert(root.left, value)\nelse:\nroot.right = insert(root.right, value)\nreturn root",
    "test('fetchData returns correct data', async () => {\nconst mockResponse = { data: 'sample' };\nfetch.mockResolvedValueOnce({\nok: true,\njson: async () => mockResponse,\n});\nconst data =\nawait fetchData('/api/data');\nexpect(data).toEqual(mockResponse);});",
  ],
  entertainment: [
    "In Elden Ring, prioritize upgrading your weapon to +3 before taking on Margit the Fell Omen. Farm runes in Limgrave for easier progression.",
    "The Witcher 3: Wild Hunt has multiple endings based on your choices throughout the game. Save before key decisions to explore different outcomes.",
    "In Cyberpunk 2077, invest in the 'Body' attribute to increase health and stamina. This will help you survive longer in combat situations.",
    "In Inception, the spinning top at the end symbolizes ambiguity. The key clue is Cobb ignoring the top, implying he's accepted his reality, dream or not.",
    "The Mandalorian Season 2 finale features a surprise appearance by Luke Skywalker. The scene was created using CGI and Mark Hamill's de-aged face.",
    "In The Matrix, the red pill symbolizes the truth of reality, while the blue pill represents ignorance and illusion. Neo's choice determines his fate.",
    "In football, the 4-3-3 formation works best when the team has a strong midfield and pacey wingers. Use this setup for counter-attacking play.",
    "Lionel Messi's World Cup-winning performance in 2022 exemplifies leadership. His adaptability as both a playmaker and finisher was key.",
    "The Marvel Cinematic Universe (MCU) Phase 4 introduces new characters like Shang-Chi and the Eternals. Stay updated on the latest releases.",
    "Keep a list of movie s/web series to watch with different genres. Prioritize those with strong IMDb/Rotten Tomatoes ratings and reviews from friends.",
  ],
  finance: [
    "Diversify your investment portfolio to reduce risk. Allocate assets across different classes like stocks, bonds, and real estate.",
    "Review your credit report annually to check for errors or fraudulent activity. Dispute any inaccuracies to maintain a healthy credit score.",
    "Automate your savings by setting up recurring transfers to a high-yield savings account. This will help you build an emergency fund over time.",
    "Consider refinancing your mortgage if interest rates have dropped since you purchased your home. This can lower your monthly payments and save you money.",
    "Track your expenses using budgeting apps like Mint or YNAB. Categorize your spending to identify areas where you can cut back.",
    "Invest in a retirement account like a 401(k) or IRA to take advantage of tax benefits and compound interest over time.",
    "Pay off high-interest debt first to reduce the amount of interest you pay over time. Consider using the debt snowball or avalanche method.",
    "Set financial goals and create a plan to achieve them. Break down your goals into smaller, manageable steps and track your progress.",
    "Build a diversified investment portfolio that aligns with your risk tolerance and financial goals. Rebalance your portfolio periodically to maintain your desired asset allocation.",
    "Consider working with a financial advisor to create a comprehensive financial plan. They can provide personalized advice and help you stay on track.",
  ],
  notes: [
    "Grocery List\nNeed to buy:\nMilk\nBread\nEggs\nChicken breast\nSpinach\nLaundry detergent",
    "To-Do List for Home Maintenance\nWeekend chores:\nMow the lawn\nClean out garage\nFix leaky faucet in bathroom\nWater indoor plants\nTake out recycling",
    "Meeting Notes - 10/15/2022\nAgenda:\nProject updates\nUpcoming deadlines\nAction items:\nComplete feature A by EOD\nSchedule meeting with stakeholders\nPrepare presentation for next week\nNext meeting: 10/22/2022 at 10:00 AM",
    "Travel Itinerary - Europe Trip\nDestinations:\nParis, France\nRome, Italy\nBarcelona, Spain\nActivities:\nEiffel Tower tour\nColosseum visit\nSagrada Familia tour\nFlight details:\nDeparture: 11/05/2022 at 8:00 AM\nReturn: 11/20/2022 at 6:00 PM",
    "Book Liic Habits' by James Clear\n'Sapiens' by Yuval Noah Harari\n'1984' by George Orwell\n'Brave New World' by Aldous Huxley",
    "Workout Plan\nMonday:\nChst\nTo Read:\n'Atomest and Triceps\nTuesday:\nBack and Biceps\nWednesday:\nLegs and Abs\nThursday:\nShoulders and Cardio\nFriday:\nFull Body",
    "Recipe - Chocolate Chip Cookies\nIngredients:\n1 cup butter\n1 cup sugar\n2 cups flour\n1 tsp baking soda\n1 cup chocolate chips\nInstructions:\n1. Preheat oven to 350°F\n2. Mix butter and sugar\n3. Add flour and baking soda\n4. Stir in chocolate chips\n5. Bake for 10-12 minutes",
    "Project Ideas\n1. Build a personal website\n2. Create a mobile app for task management\n3. Develop a game using Unity\n4. Start a blog about tech trends\n5. Design a smart home automation system",
  ],
  quotes: [
    "Wisdom and Personal Growth The only true wisdom is in knowing you know nothing. — Socrates",
    "Resilience and Determination Success is not final, failure is not fatal: it is the courage to continue that counts.— Winston Churchill",
    "Self-Reflection Be yourself; everyone else is already taken. — Oscar Wilde",
    "Hope and Perseverance Hope is being able to see that there is light despite all of the darkness. — Desmond Tutu",
    "Personal Potential The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "No act of kindness, no matter how small, is ever wasted. — Aesop",
    "I have no special talent. I am only passionately curious. — Albert Einstein",
    "Courage is not the absence of fear, but the triumph over it. — Nelson Mandela",
    "Life is what happens to you while you're busy making other plans.",
    "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
  ],
};
