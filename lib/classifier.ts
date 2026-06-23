export type TaskType =
  | "general"
  | "coding"
  | "reasoning"
  | "research"
  | "creative"
  | "writing";

export type Difficulty = "low" | "medium" | "high";

export type KnowledgeNeed = "none" | "factual" | "specialized" | "current";

export type CostLevel = "minimal" | "balanced" | "quality";

export type SpeedNeed = "urgent" | "normal" | "flexible";

export interface Classification {
  task_type: TaskType;
  difficulty: Difficulty;
  knowledge_need: KnowledgeNeed;
  cost_level: CostLevel;
  speed_need: SpeedNeed;
  confidence: number;
}

export interface ClassifyOptions {
  /** Override default cost preference when the user or session specifies one. */
  cost_level?: CostLevel;
  /** Override default speed preference when the user or session specifies one. */
  speed_need?: SpeedNeed;
}

const CODING_PATTERN =
  /\b(code|coding|debug|refactor|typescript|javascript|python|rust|golang|java|react|next\.?js|api|function|class|import|npm|git|sql|regex|algorithm|compile|syntax|bug|stack\s*trace|pull\s*request)\b/i;

const RESEARCH_PATTERN =
  /\b(research|sources?|citations?|compare|versus|vs\.?|literature|studies|evidence|survey|meta-?analysis|whitepaper|benchmark)\b/i;

const REASONING_PATTERN =
  /\b(prove|derive|logic|reason|analyze|evaluate|optimize|theorem|probability|calculus|equation|puzzle|riddle|step[\s-]by[\s-]step|trade[\s-]?offs?)\b/i;

const MATH_PATTERN =
  /\b(calculate|solve|integral|derivative|matrix|statistics?|math|algebra|geometry)\b/i;

const CREATIVE_PATTERN =
  /\b(story|poem|song|brainstorm|creative|imagine|fiction|character|plot|lyrics)\b/i;

const WRITING_PATTERN =
  /\b(write|draft|edit|rewrite|proofread|email|essay|blog|copy|summarize|summary|outline|tone)\b/i;

const CURRENT_EVENTS_PATTERN =
  /\b(today|latest|current|recent|news|this\s+(week|month|year)|202[4-9]|who\s+is\s+the\s+(current|new))\b/i;

const SPECIALIZED_PATTERN =
  /\b(legal|medical|clinical|financial|regulatory|compliance|patent|pharma|tax|accounting|HIPAA|GDPR)\b/i;

const URGENT_PATTERN =
  /\b(quick|quickly|asap|urgent|fast|right\s+now|immediately|hurry)\b/i;

const COMPLEXITY_PATTERN =
  /\b(comprehensive|detailed|in[\s-]depth|thorough|multi[\s-]step|architecture|system\s+design|edge\s+cases?)\b/i;

function scorePattern(text: string, pattern: RegExp): number {
  const matches = text.match(new RegExp(pattern.source, "gi"));
  return matches?.length ?? 0;
}

function detectTaskType(message: string): TaskType {
  const scores: Record<TaskType, number> = {
    coding: scorePattern(message, CODING_PATTERN),
    research: scorePattern(message, RESEARCH_PATTERN),
    reasoning: scorePattern(message, REASONING_PATTERN) + scorePattern(message, MATH_PATTERN),
    creative: scorePattern(message, CREATIVE_PATTERN),
    writing: scorePattern(message, WRITING_PATTERN),
    general: 0,
  };

  const ranked = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const [topType, topScore] = ranked[0];

  if (topScore === 0) {
    return "general";
  }

  return topType as TaskType;
}

function detectDifficulty(message: string): Difficulty {
  const wordCount = message.trim().split(/\s+/).length;
  const complexityHits = scorePattern(message, COMPLEXITY_PATTERN);
  const questionMarks = (message.match(/\?/g) ?? []).length;
  const hasCodeBlock = /```/.test(message);

  let score = 0;
  if (wordCount > 80) score += 2;
  else if (wordCount > 35) score += 1;

  score += complexityHits;
  score += Math.min(questionMarks, 2);
  if (hasCodeBlock) score += 2;

  if (score >= 4) return "high";
  if (score >= 2) return "medium";
  return "low";
}

function detectKnowledgeNeed(message: string, taskType: TaskType): KnowledgeNeed {
  if (scorePattern(message, CURRENT_EVENTS_PATTERN) > 0 || taskType === "research") {
    return "current";
  }

  if (scorePattern(message, SPECIALIZED_PATTERN) > 0) {
    return "specialized";
  }

  if (/\b(what|when|where|who|which|how\s+many|define|explain)\b/i.test(message)) {
    return "factual";
  }

  return "none";
}

function detectSpeedNeed(message: string, difficulty: Difficulty): SpeedNeed {
  if (scorePattern(message, URGENT_PATTERN) > 0) {
    return "urgent";
  }

  if (difficulty === "high") {
    return "flexible";
  }

  return "normal";
}

function detectCostLevel(
  message: string,
  difficulty: Difficulty,
  options?: ClassifyOptions,
): CostLevel {
  if (options?.cost_level) {
    return options.cost_level;
  }

  if (/\b(best|highest\s+quality|most\s+accurate|premium)\b/i.test(message)) {
    return "quality";
  }

  if (/\b(cheap|budget|cost[\s-]effective|minimal)\b/i.test(message)) {
    return "minimal";
  }

  if (difficulty === "high") {
    return "quality";
  }

  return "balanced";
}

function computeConfidence(message: string, taskType: TaskType): number {
  const wordCount = message.trim().split(/\s+/).length;
  const signal =
    taskType === "general"
      ? 0.35
      : Math.min(0.95, 0.55 + wordCount / 200);

  return Number(signal.toFixed(2));
}

/**
 * Classify a user message into routing dimensions.
 * Uses deterministic heuristics today; swap the internals for an LLM classifier later.
 */
export function classifyMessage(
  message: string,
  options?: ClassifyOptions,
): Classification {
  const normalized = message.trim();

  const task_type = detectTaskType(normalized);
  const difficulty = detectDifficulty(normalized);
  const knowledge_need = detectKnowledgeNeed(normalized, task_type);
  const speed_need = options?.speed_need ?? detectSpeedNeed(normalized, difficulty);
  const cost_level = detectCostLevel(normalized, difficulty, options);
  const confidence = computeConfidence(normalized, task_type);

  return {
    task_type,
    difficulty,
    knowledge_need,
    cost_level,
    speed_need,
    confidence,
  };
}
