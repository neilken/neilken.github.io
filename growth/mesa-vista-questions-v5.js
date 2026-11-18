const QUESTION_BANK = [
  {
    "id": 1,
    "prompt": "A community water system can supply 900,000 gallons per day. Current demand is 760,000 gallons per day, and a new development is expected to add 180,000 gallons per day. Assuming capacity stays the same, what is the projected shortage?",
    "choices": [
      "40,000 gallons per day",
      "140,000 gallons per day",
      "180,000 gallons per day",
      "940,000 gallons per day."
    ]
  },
  {
    "id": 2,
    "prompt": "A school can serve 500 students and currently enrolls 450. A development is projected to add 80 students. A temporary classroom would add 20 spaces. After the classroom is added, what shortage remains?",
    "choices": [
      "30 spaces",
      "10 spaces",
      "50 spaces",
      "No shortage."
    ]
  },
  {
    "id": 3,
    "prompt": "A new housing development is farther from stores and schools. Which chain is the most reasonable possibility for planners to investigate?",
    "choices": [
      "More households → road capacity automatically increases",
      "More households → water demand necessarily decreases",
      "More households → potentially more trips → greater road demand",
      "More households → every service becomes closer."
    ]
  },
  {
    "id": 4,
    "prompt": "If projected enrollment is 490 and capacity is 480, a temporary room adds 20 spaces. Which statement is correct?",
    "choices": [
      "A shortage of ten spaces remains",
      "Twenty spaces remain available",
      "Capacity stays at 480",
      "Ten spaces remain available."
    ]
  },
  {
    "id": 5,
    "prompt": "Mesa Vista projects 650 vehicles on a road whose peak-hour capacity is 600 vehicles. If a transit program shifts 35 of those projected trips off the road during that same hour, what is the remaining difference from capacity?",
    "choices": [
      "15 vehicles above capacity",
      "15 vehicles below capacity",
      "35 vehicles above capacity",
      "50 vehicles above capacity."
    ]
  },
  {
    "id": 6,
    "prompt": "Two proposals address the projected peak-hour road demand of 650 vehicles. Proposal X raises capacity from 600 to 640 vehicles; proposal Y reduces demand by 60 vehicles without changing capacity. Which statement is correct?",
    "choices": [
      "Both proposals leave demand 10 above capacity",
      "X leaves demand 10 above capacity; Y leaves demand 10 below capacity",
      "X leaves demand 10 below capacity; Y leaves demand 10 above capacity",
      "Both proposals make demand equal capacity."
    ]
  },
  {
    "id": 7,
    "prompt": "A planner says the projected water-demand increase of 300,000 gallons per day is a 30% increase from the current demand of 800,000 gallons per day. Which correction is accurate?",
    "choices": [
      "It is 27.3%, because 300,000 ÷ 1,100,000 is the increase from current demand",
      "It is 80%, because current demand is 800,000",
      "It is 37.5%, because 300,000 ÷ 800,000 = 0.375",
      "It is 137.5%, because that is the increase alone."
    ]
  },
  {
    "id": 8,
    "prompt": "The projected daily water demand is 1,100,000 gallons and current capacity is 1,000,000. If water conservation reduces projected demand by 8%, what remaining shortfall is expected, assuming capacity remains unchanged?",
    "choices": [
      "8,000 gallons per day",
      "88,000 gallons per day",
      "No shortfall; 12,000 gallons of capacity remain",
      "12,000 gallons per day."
    ]
  },
  {
    "id": 9,
    "prompt": "Mesa Vista has 380 suitable homes in total, of which 300 are occupied. If 120 incoming households each need one home and no current household moves, how many more homes are needed?",
    "choices": [
      "40",
      "80",
      "120",
      "420."
    ]
  },
  {
    "id": 10,
    "prompt": "A housing proposal would add 25 homes, but 10 existing suitable homes would be removed. Compared with the projected need of 420 homes, what shortage would remain?",
    "choices": [
      "15 homes",
      "25 homes",
      "35 homes",
      "55 homes."
    ]
  },
  {
    "id": 11,
    "prompt": "Which system has the greatest projected shortage as a percentage of its own current capacity?",
    "choices": [
      "Road: 50 over 600",
      "Water: 100,000 over 1,000,000",
      "Housing: 40 over 380",
      "School: 10 over 480."
    ]
  },
  {
    "id": 12,
    "prompt": "The community adds 40 homes for the 120 incoming households. Which additional conclusion is best supported?",
    "choices": [
      "The water shortage must disappear because housing capacity rises",
      "The new homes guarantee that peak-hour road demand falls",
      "The project eliminates the school-space shortage",
      "The added homes resolve the housing shortage under the model’s assumptions, but water demand still needs separate analysis."
    ]
  },
  {
    "id": 13,
    "prompt": "Planners want to check whether projected school overcrowding is likely. Which evidence is most useful?",
    "choices": [
      "Forecasts of school-age children, likely enrollment, and usable school spaces",
      "Total new residents alone, without ages or school choices",
      "The color and number of nearby buildings",
      "A satellite image without enrollment information."
    ]
  },
  {
    "id": 14,
    "prompt": "Reset the model to its original scenario. The road can handle 600 vehicles per peak hour. Predict how many of the projected trips must shift away from that hour to eliminate the shortage. Use “Fewer road trips per peak hour” to test your prediction. What is the smallest reduction that eliminates the shortage?",
    "choices": [
      "25 vehicles per peak hour",
      "50 vehicles per peak hour",
      "100 vehicles per peak hour",
      "200 vehicles per peak hour"
    ]
  },
  {
    "id": 15,
    "prompt": "A road has a capacity of 600 vehicles per peak hour. If a project increases that capacity by 8%, what is the new capacity?",
    "choices": [
      "608 vehicles per peak hour",
      "640 vehicles per peak hour",
      "648 vehicles per peak hour",
      "680 vehicles per peak hour"
    ]
  },
  {
    "id": 16,
    "prompt": "If that 8% road-capacity increase occurs while demand stays at 650 vehicles per peak hour, what is the remaining difference?",
    "choices": [
      "2 above capacity",
      "2 below capacity",
      "48 above capacity",
      "50 below capacity."
    ]
  },
  {
    "id": 17,
    "prompt": "Reset the model to its original scenario. Under “Change a solution,” add 100,000 gallons per day of water capacity. Compare projected water demand with the new capacity. How much unused capacity remains?",
    "choices": [
      "100,000 gallons per day",
      "50,000 gallons per day",
      "10,000 gallons per day",
      "None; projected demand equals capacity"
    ]
  },
  {
    "id": 18,
    "prompt": "Reset the model to its original scenario. A planner can add either 50,000 or 100,000 gallons per day of water capacity. Test each option using the water control, changing no other setting. Which choice describes the results?",
    "choices": [
      "Both options eliminate the shortage",
      "Only adding 100,000 gallons per day eliminates the shortage",
      "Only adding 50,000 gallons per day eliminates the shortage",
      "Neither option eliminates the shortage"
    ]
  },
  {
    "id": 19,
    "prompt": "Reset the model to its original scenario, then move “Incoming households” to 60. With no solution changes, compare projected daily water demand with the system’s capacity. What does the model show?",
    "choices": [
      "A shortage of 50,000 gallons per day",
      "Demand equals capacity",
      "50,000 gallons per day of unused capacity",
      "150,000 gallons per day of unused capacity"
    ]
  },
  {
    "id": 20,
    "prompt": "Suppose 15 of the 120 projected incoming households decide not to move. Under the one-home-per-household assumption, how many homes would still be needed beyond the existing total of 380?",
    "choices": [
      "25",
      "15",
      "40",
      "105."
    ]
  },
  {
    "id": 21,
    "prompt": "Of the 80 homes not currently occupied, suppose 12 are unsuitable and cannot be used. How many additional suitable homes would be needed for the projected 120 incoming households?",
    "choices": [
      "28",
      "40",
      "48",
      "52."
    ]
  },
  {
    "id": 22,
    "prompt": "Growth adds 70 school students, but an enrollment update lowers that estimate by 20. With capacity unchanged at 480, how many spaces remain after growth?",
    "choices": [
      "10",
      "20",
      "30",
      "50."
    ]
  },
  {
    "id": 23,
    "prompt": "The school can add 30 spaces for 70 credits. The water project costs 90 credits. With a budget of 100 credits, which statement is supported?",
    "choices": [
      "Both projects can be funded with 10 credits left",
      "Both projects can be funded exactly",
      "Either project individually fits, but both together exceed the budget",
      "Neither project individually fits the budget."
    ]
  },
  {
    "id": 24,
    "prompt": "Reset the model. A water-capacity project costs 90 credits and adds 150,000 gallons per day. The total budget is 100 credits. Test the capacity increase using the water control. Which statement best describes this decision?",
    "choices": [
      "The project is over budget, but it removes the school shortage",
      "The project is within budget and removes the water shortage, but it does not directly add school spaces",
      "The project uses the full budget and directly adds school spaces",
      "The project is within budget, but it leaves a water shortage"
    ]
  },
  {
    "id": 25,
    "prompt": "A student compares the road shortage of 50 vehicles with the water shortage of 100,000 gallons and concludes that water is necessarily the more serious problem. What is the best evaluation?",
    "choices": [
      "Correct, because the larger number always indicates greater importance",
      "Correct, because gallons and vehicles measure the same thing",
      "Incorrect, because neither system has a shortage",
      "The raw numbers have different units; compare impacts, capacity relative to demand, and priorities."
    ]
  },
  {
    "id": 26,
    "prompt": "Which evidence would most directly test whether a proposed bus service could reduce peak-hour road demand?",
    "choices": [
      "The bus color and number of seats in a classroom",
      "Estimated riders who would otherwise drive during the same peak hour",
      "The town’s annual rainfall alone",
      "The total number of homes without information about travel."
    ]
  },
  {
    "id": 27,
    "prompt": "A water system has a capacity of 900,000 gallons per day. Demand is projected to be 950,000 gallons per day. A project adds 80,000 gallons per day of capacity, but demand also rises by another 20,000 gallons per day. What is the result?",
    "choices": [
      "A shortage of 10,000 gallons per day",
      "10,000 gallons per day of unused capacity",
      "A shortage of 30,000 gallons per day",
      "30,000 gallons per day of unused capacity."
    ]
  },
  {
    "id": 28,
    "prompt": "The community can fund only one of two projects. One adds enough school spaces to remove the projected shortage; the other addresses water capacity. What is the clearest trade-off if it chooses the school project?",
    "choices": [
      "Both shortages are automatically eliminated",
      "The school’s capacity necessarily falls",
      "The school shortage is addressed, but water capacity remains unaddressed by that project",
      "A budget no longer limits future choices."
    ]
  },
  {
    "id": 29,
    "prompt": "Reset the model. Under “Change a solution,” reduce road trips by 35 vehicles per peak hour. Two students make claims: “Traffic is 15 below capacity” and “Traffic is 15 above capacity.” Which statement is supported by the model?",
    "choices": [
      "Traffic is 15 below capacity because 650 − 35 = 585",
      "Traffic equals capacity because the reduction is greater than zero",
      "Traffic is 35 above capacity because capacity is 650",
      "Traffic is 15 above capacity because 650 − 35 = 615, compared with capacity of 600"
    ]
  },
  {
    "id": 30,
    "prompt": "A planner wants to apply the fictional Mesa Vista results directly to Gallup. Which step best supports a sound decision?",
    "choices": [
      "Replace the estimates with current local demand, capacity, and growth evidence, then recheck the conclusions",
      "Use the fictional data as an official forecast",
      "Assume every community grows at the same rate",
      "Rely on a single map image to establish all capacities."
    ]
  },
  {
    "id": 31,
    "prompt": "A road’s peak-hour capacity is 800 vehicles. Demand is 740 vehicles before growth and 110 additional vehicles after growth. A transit project removes 30 of the projected peak-hour trips. What is the remaining difference?",
    "choices": [
      "20 vehicles below capacity",
      "20 vehicles above capacity",
      "50 vehicles above capacity",
      "Demand equals capacity."
    ]
  },
  {
    "id": 32,
    "prompt": "A water system supplies 1,200,000 gallons per day. Projected demand is 1,260,000. A new pump adds 40,000 gallons per day of capacity. What shortage remains?",
    "choices": [
      "20,000 gallons per day",
      "40,000 gallons per day",
      "60,000 gallons per day",
      "100,000 gallons per day."
    ]
  },
  {
    "id": 33,
    "prompt": "A town has 500 suitable homes in total and 460 are occupied. Eighty new households each need one home, and ten currently suitable unoccupied homes will be removed. How many additional suitable homes are needed?",
    "choices": [
      "30",
      "40",
      "50",
      "90."
    ]
  },
  {
    "id": 34,
    "prompt": "A school has 700 spaces and currently enrolls 660 students. Growth adds 70 students. A project provides 50 more spaces. What is the result?",
    "choices": [
      "A shortage of 20 spaces",
      "A shortage of 30 spaces",
      "Exactly full",
      "20 unused spaces."
    ]
  },
  {
    "id": 35,
    "prompt": "A project reduces projected water demand from 1,000,000 to 900,000 gallons per day. What is the percentage decrease from the original projection?",
    "choices": [
      "9%",
      "10%",
      "11.1%",
      "90%."
    ]
  },
  {
    "id": 36,
    "prompt": "Project X costs 60 credits and adds 20 school spaces. Project Y costs 90 credits and adds 35 spaces. If the only stated criterion is adding the most spaces while staying within a 100-credit limit, which project is preferred?",
    "choices": [
      "Project Y",
      "Project X",
      "Neither",
      "Both add the same number."
    ]
  },
  {
    "id": 37,
    "prompt": "A planner wants to reduce water demand by at least 100,000 gallons per day. Option A saves 70,000, Option B saves 110,000, and each can be chosen separately within budget. Which option meets the demand-reduction criterion?",
    "choices": [
      "A only",
      "Both A and B",
      "B only",
      "Neither."
    ]
  },
  {
    "id": 38,
    "prompt": "A new housing project meets housing needs but increases demand on an already crowded road. Which additional investigation is most appropriate?",
    "choices": [
      "Decide that the road cannot be affected",
      "Compare the project’s paint colors with nearby homes",
      "Assume the road will expand on its own",
      "Estimate new peak-hour trips and compare projected traffic with road capacity."
    ]
  },
  {
    "id": 39,
    "prompt": "A community expands a water system using nearly all its budget. Which is a reasonable trade-off?",
    "choices": [
      "Water capacity rises, while fewer funds may remain for other projects",
      "All other systems automatically gain capacity",
      "Water demand becomes zero",
      "The project cannot have any benefits."
    ]
  },
  {
    "id": 40,
    "prompt": "A proposed solution appears effective in the fictional model. Which conclusion is best supported?",
    "choices": [
      "It is guaranteed to solve every real community’s problem",
      "It may meet the fictional criteria, but real-world implementation requires local data and further evaluation",
      "Its cost is the actual cost in Gallup",
      "Community input is unnecessary."
    ]
  }
];

