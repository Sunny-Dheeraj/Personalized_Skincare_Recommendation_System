from typing import Literal

from pydantic import BaseModel, Field


class ConcernResponse(BaseModel):
    name: str
    level: Literal["Mild", "Moderate", "Elevated"]
    summary: str
    icon: str
    score: int = Field(ge=0, le=100)


class IngredientResponse(BaseModel):
    name: str
    description: str
    benefits: list[str]
    tags: list[str]
    when: str


class RoutineStepResponse(BaseModel):
    order: int
    title: str
    description: str
    icon: str
    focus: str
    ingredients: list[str]


class RoutineResponse(BaseModel):
    title: str
    steps: list[RoutineStepResponse]


class AnalysisResponse(BaseModel):
    user_name: str
    skin_type: str
    acne_severity: Literal["Mild", "Moderate", "Severe"]
    sensitive_skin: bool
    concerns: list[ConcernResponse]
    recommended_ingredients: list[IngredientResponse]
    morning_routine: RoutineResponse
    night_routine: RoutineResponse
    tip_of_the_day: str
    disclaimer: str
    footer_note: str
