import { classifyMessage, type Classification, type ClassifyOptions } from "@/lib/classifier";
import { getModel, type ModelConfig, type ModelTier } from "@/lib/models";

export interface RouteResult {
  classification: Classification;
  model: ModelConfig;
  reason: string;
}

/**
 * Select a model tier from classification signals.
 * Rules are evaluated in priority order; the first match wins.
 */
export function selectModelTier(classification: Classification): {
  tier: ModelTier;
  reason: string;
} {
  const { task_type, difficulty, knowledge_need, cost_level, speed_need } =
    classification;

  if (task_type === "coding") {
    return {
      tier: "coding_model",
      reason: "Task involves programming or technical implementation.",
    };
  }

  if (
    task_type === "research" ||
    knowledge_need === "current" ||
    knowledge_need === "specialized"
  ) {
    return {
      tier: "research_model",
      reason: "Task needs grounded or up-to-date domain knowledge.",
    };
  }

  if (
    task_type === "reasoning" ||
    difficulty === "high" ||
    (difficulty === "medium" && cost_level === "quality")
  ) {
    return {
      tier: "reasoning_model",
      reason: "Task requires deep reasoning or multi-step analysis.",
    };
  }

  if (
    cost_level === "minimal" ||
    (speed_need === "urgent" && difficulty === "low")
  ) {
    return {
      tier: "cheap_fast_model",
      reason: "Task is simple or prioritizes speed and cost efficiency.",
    };
  }

  if (task_type === "creative" || task_type === "writing") {
    return {
      tier: difficulty === "low" ? "cheap_fast_model" : "reasoning_model",
      reason:
        difficulty === "low"
          ? "Creative or writing task with low complexity."
          : "Creative or writing task with higher complexity.",
    };
  }

  return {
    tier: "cheap_fast_model",
    reason: "Default route for general low-to-medium complexity tasks.",
  };
}

/**
 * Route a classification to a concrete model configuration.
 */
export function routeClassification(classification: Classification): RouteResult {
  const { tier, reason } = selectModelTier(classification);

  return {
    classification,
    model: getModel(tier),
    reason,
  };
}

/**
 * End-to-end pipeline: user message → classifier → router → model.
 */
export function routeMessage(
  message: string,
  options?: ClassifyOptions,
): RouteResult {
  const classification = classifyMessage(message, options);
  return routeClassification(classification);
}
