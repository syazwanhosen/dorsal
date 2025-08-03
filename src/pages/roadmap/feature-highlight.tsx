import { useState } from "react";
import type { FeatureType } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Receipt,
  FileSearch,
  BarChart3,
  Shield,
  Wallet,
  Trophy,
  UserCog,
  BadgeAlert,
  Sparkles,
  Users,
  Lightbulb,
  PauseCircle,
  Award,
  Building,
  Handshake,
} from "lucide-react"
import { Button } from "@/components/ui/buttons/button"

interface FeatureHighlightProps {
  feature: FeatureType
}

export function FeatureHighlight({ feature }: FeatureHighlightProps) {

  const [expanded, setExpanded] = useState(false);

  const getFeatureIcon = (iconName: string) => {
    const icons = {
      fileText: <FileText className="h-6 w-6 text-purple" />,
      receipt: <Receipt className="h-6 w-6 text-purple" />,
      fileSearch: <FileSearch className="h-6 w-6 text-purple" />,
      barChart: <BarChart3 className="h-6 w-6 text-purple" />,
      building: <Building className="h-6 w-6 text-purple" />,
      shield: <Shield className="h-6 w-6 text-purple" />,
      wallet: <Wallet className="h-6 w-6 text-purple" />,
      trophy: <Trophy className="h-6 w-6 text-purple" />,
      userCog: <UserCog className="h-6 w-6 text-purple" />,
      badgeAlert: <BadgeAlert className="h-6 w-6 text-purple" />,
      sparkles: <Sparkles className="h-6 w-6 text-purple" />,
      handshake: <Handshake className="h-6 w-6 text-purple" />,
      users: <Users className="h-6 w-6 text-purple" />,
    }

    return icons[iconName as keyof typeof icons] || <FileText className="h-6 w-6 text-purple-600" />
  }

  const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "live":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </span>
      );
    case "in progress":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <Clock className="h-4 w-4 text-white" />
        </span>
      );
    case "coming soon":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <AlertCircle className="h-4 w-4 text-white" />
        </span>
      );
    case "proposal":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <Lightbulb className="h-4 w-4 text-white" />
        </span>
      );
    case "mothballed":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <PauseCircle className="h-4 w-4 text-white" />
        </span>
      );
    case "mvp":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <Award className="h-4 w-4 text-white" />
        </span>
      );
    default:
      // fallback
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <AlertCircle className="h-4 w-4 text-white" />
        </span>
      );
  }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "bg-green-500 text-white"
      case "in progress":
        return "bg-blue-500 text-white"
      case "coming soon":
        return "bg-yellow-500 text-white"
      case "proposal":
        return "bg-teal-500 text-white"
      case "mothballed":
        return "bg-gray-500 text-white"
      case "mvp":
        return "bg-pink text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-50 p-3 rounded-lg">{getFeatureIcon(feature.icon)}</div>
          <Badge className={getStatusColor(feature.status)}>
            {getStatusIcon(feature.status)}
            <span className="ml-1">
              {feature.status === "Live"
                ? "Live"
                : feature.status === "In Progress"
                ? "In Progress"
                : feature.status === "Coming Soon"
                ? "Coming Soon"
                : feature.status === "Proposal"
                ? "Proposal"
                : feature.status === "Mothballed"
                ? "Mothballed"
                : feature.status === "MVP"
                ? "MVP"
                : "Unknown"}
            </span>
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className={`text-gray-600 text-sm mb-2 ${expanded ? "" : "line-clamp-3"}`}>
        {feature.description}
        </p>
        {feature.description.length > 30 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-purple hover:text-purple-700 px-0 py-0 mb-4"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Learn more"}
          </Button>
        )}

        {feature.progress !== undefined && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  feature.status === "Live"
                    ? "bg-green-500"
                    : feature.status === "In Progress"
                    ? "bg-blue-500"
                    : feature.status === "Coming Soon"
                    ? "bg-yellow-500"
                    : feature.status === "Proposal"
                    ? "bg-orange-500"
                    : feature.status === "Mothballed"
                    ? "bg-gray-400"
                    : feature.status === "MVP"
                    ? "bg-indigo-500"
                    : "bg-purple-500"
                }`}
                style={{ width: `${feature.progress ?? 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">{feature.progress}%</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium text-purple-700 mr-2">{feature.votes}</span>
            <span className="text-sm text-black">total votes</span>
          </div>
        </div>
      </div>
    </div>
  )
}
