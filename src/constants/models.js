export const SDLC_MODELS = [
  {
    name: "Waterfall",
    description: "A linear and sequential approach where each phase must be completed before the next begins. Best for projects with clear, stable requirements.",
    workflowType: "linear",
    steps: ["Requirements", "Design", "Development", "Testing", "Deployment", "Maintenance"],
    stepDetails: [
      "Gathering all project requirements upfront to create a fixed scope.",
      "Creating the system architecture and detailed design specifications.",
      "Actual coding and implementation of the design components.",
      "Verifying the system against requirements after development is finished.",
      "Releasing the product to the production environment.",
      "Ongoing support and bug fixing after the release."
    ],
    metrics: { 
      flexibility: "Low", 
      risk: "High", 
      time: "Fixed / Long", 
      cost: "High (Upfront)",
      involvement: "Minimal",
      testing: "Late Stage",
      bestFor: "Govt/Regulated Projects"
    }
  },
  {
    name: "Agile",
    description: "An iterative approach focused on continuous delivery and customer feedback. Highly flexible and adaptive to changing requirements.",
    workflowType: "iterative",
    steps: ["Plan", "Design", "Develop", "Testing", "Review", "Launch"],
    stepDetails: [
      "Defining the sprint goal and prioritizing features from the backlog.",
      "Lightweight design focused on immediate sprint requirements.",
      "Rapid iterative development of functional software increments.",
      "Continuous testing integrated into the development cycle.",
      "Demonstrating the increment to stakeholders for feedback.",
      "Frequent releases of working software to users."
    ],
    metrics: { 
      flexibility: "High", 
      risk: "Low", 
      time: "Dynamic / Ongoing", 
      cost: "Medium (Iterative)",
      involvement: "Constant",
      testing: "Continuous",
      bestFor: "Startups/SaaS"
    }
  },
  {
    name: "Spiral",
    description: "A risk-driven model that combines iterative development with systematic aspects of the Waterfall model. Focuses on early risk identification.",
    workflowType: "spiral",
    steps: ["Planning", "Risk Analysis", "Engineering", "Evaluation"],
    stepDetails: [
      "Determining objectives, alternatives, and constraints of the cycle.",
      "Identifying and resolving technical and management risks.",
      "Developing the next-level product/prototype.",
      "Reviewing the results with the customer to plan the next spiral."
    ],
    metrics: { 
      flexibility: "Medium", 
      risk: "Low (Mitigated)", 
      time: "Very Long", 
      cost: "Very High",
      involvement: "High",
      testing: "Every Cycle",
      bestFor: "Mission Critical Systems"
    }
  },
  {
    name: "V-Model",
    description: "An extension of Waterfall where a corresponding testing phase is planned for every development stage. Focuses on early validation.",
    workflowType: "v-shape",
    steps: ["Requirements", "System Design", "Architecture", "Module Design", "Coding", "Validation"],
    stepDetails: [
      "Capturing user needs and planning acceptance tests simultaneously.",
      "Designing system features while planning system tests.",
      "Defining high-level architecture and planning integration tests.",
      "Detailed component design while planning unit tests.",
      "Actual implementation of code.",
      "Executing all planned tests in reverse order (Unit to Acceptance)."
    ],
    metrics: { 
      flexibility: "Low", 
      risk: "Medium", 
      time: "Long", 
      cost: "High",
      involvement: "Medium",
      testing: "Early Planned",
      bestFor: "Medical/Safety Software"
    }
  },
  {
    name: "Iterative",
    description: "Starts with a small set of requirements and iteratively enhances the system until the full system is implemented.",
    workflowType: "iterative",
    steps: ["Analysis", "Design", "Implementation", "Testing", "Deployment"],
    stepDetails: [
      "Reviewing current system state and planning next increment.",
      "Specifying changes for the current version.",
      "Coding and integrating new features.",
      "Verifying current version stability.",
      "Releasing the incremental version to users."
    ],
    metrics: { 
      flexibility: "Medium-High", 
      risk: "Medium", 
      time: "Iterative", 
      cost: "Moderate",
      involvement: "High",
      testing: "Per Iteration",
      bestFor: "Web Portals"
    }
  },
  {
    name: "Incremental",
    description: "The product is designed, implemented and tested incrementally until the product is finished.",
    workflowType: "linear",
    steps: ["Requirements", "Modular Design", "Build 1", "Build 2", "Deployment"],
    stepDetails: [
      "Full system requirements analysis up-front.",
      "Breaking system into independent functional modules.",
      "Developing and delivering the core module first.",
      "Developing subsequent modules and attaching them to the core.",
      "Final delivery of the complete integrated product."
    ],
    metrics: { 
      flexibility: "Medium", 
      risk: "Medium", 
      time: "Module-Based", 
      cost: "Staggered",
      involvement: "Low-Medium",
      testing: "Per Module",
      bestFor: "Large Scale Modular Apps"
    }
  },
  {
    name: "Prototype",
    description: "A working version of the system is built quickly to gather user feedback before full development.",
    workflowType: "spiral",
    steps: ["Initial Concept", "Build Prototype", "User Review", "Refine", "Scale-Up"],
    stepDetails: [
      "Defining basic customer requirements.",
      "Developing a quick 'mock-up' or functional model.",
      "Presenting the mock-up to users for direct feedback.",
      "Updating the design based on user input.",
      "Transforming the prototype into a production-ready system."
    ],
    metrics: { 
      flexibility: "Very High", 
      risk: "Low (UI/UX)", 
      time: "Fast", 
      cost: "Moderate",
      involvement: "Constant",
      testing: "User-Centric",
      bestFor: "Experimental R&D"
    }
  },
  {
    name: "RAD",
    description: "Rapid Application Development emphasizes quick prototyping and iterative delivery over long design phases.",
    workflowType: "iterative",
    steps: ["Business Prep", "Data Modeling", "Process Model", "Dev", "Testing"],
    stepDetails: [
      "Understanding the business objectives and info flow.",
      "Defining the data objects needed for the system.",
      "Designing how data objects will be manipulated.",
      "Rapid construction using CASE tools and reusable components.",
      "Testing only new components as old ones are assumed proven."
    ],
    metrics: { 
      flexibility: "High", 
      risk: "Medium", 
      time: "Very Fast", 
      cost: "Higher (Tools)",
      involvement: "Extreme",
      testing: "Component-Based",
      bestFor: "Internal LOB Tools"
    }
  },
  {
    name: "Big Bang",
    description: "A model with little to no planning, where coding starts with the available resources and requirements evolve.",
    workflowType: "linear",
    steps: ["Funding", "Research", "Execution", "Outcome"],
    stepDetails: [
      "Securing resources and initial support.",
      "Informal exploration of technology or ideas.",
      "Intense, non-structured development effort.",
      "The result is delivered, often hit-or-miss."
    ],
    metrics: { 
      flexibility: "Extreme", 
      risk: "Very High", 
      time: "Unpredictable", 
      cost: "Variable",
      involvement: "Low",
      testing: "Post-Hoc",
      bestFor: "Hackathons/Hobbyists"
    }
  }
];
