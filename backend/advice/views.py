from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.
ADVICES = [
    "Start small, ship often.",
    "Write tests for critical logic.",
    "Keep secrets in environment variables.",
    "Use meaningful commit messages.",
    "Handle errors and show useful messages.",
    "Log important events in production.",
    "Keep dependencies updated regularly.",
    "Measure before optimizing performance.",
    "Document setup steps in a README.",
    "Automate deployments when possible.",
]

class AdviceByIndex(APIView):
    def get(self, request, index: int):
        # index expected: 1..10
        if index < 1 or index > len(ADVICES):
            return Response(
                {
                    "done": True,
                    "message": f"That's all the advice ({len(ADVICES)} total)."
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"done": False, "index": index, "advice": ADVICES[index - 1]},
            status=status.HTTP_200_OK,
        )