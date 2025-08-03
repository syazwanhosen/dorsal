import { useState, useEffect } from "react"
import axios from "axios"

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
  Package,
  Building,
  Handshake,
  Upload, 
  ClipboardList, 
  CheckCheck,
  LineChart,
  Route,
  Activity,
  HeartPulse,
  Tag,
  ShoppingCart,
  Languages,
  BookOpen,
  ChevronUp 
} from "lucide-react"
import type { FeatureType } from "@/lib/data"
import { getVote, setVote } from "@/lib/voteStorage"

interface FeatureCardProps {
  feature: FeatureType,
  featureMapping: Function
}

const baseUrl = import.meta.env.VITE_LANDING_BASE_URL;

export function FeatureCard({ feature, featureMapping }: FeatureCardProps) {
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
   const stored = await getVote(feature.id);
   
   if (stored?.voted) return null;

   try {
      const res = await axios.post(`${baseUrl}/api/vote`, {
        id: feature.id,
        type: 'upvote',
      });

      setVotes(res.data.upvotes);
      setHasVoted(true);
      await featureMapping()
      await setVote(feature.id, { count: res.data.upvotes, voted: 'upvote' });
    } catch (error) {
      console.error("Voting failed", error);
    }
  };

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
      upload: <Upload className="h-6 w-6 text-purple" />,
      clipboard: <ClipboardList className="h-6 w-6 text-purple" />,
      linechart: <LineChart className="h-6 w-6 text-purple" />,
      check: <CheckCheck className="h-6 w-6 text-purple" />,
      route: <Route className="h-6 w-6 text-purple" />,
      activity: <Activity className="h-6 w-6 text-purple" />,
      heartpulse: <HeartPulse className="h-6 w-6 text-purple" />,
      tag: <Tag className="h-6 w-6 text-purple" />,
      shoppingcart: <ShoppingCart className="h-6 w-6 text-purple" />,
      languages: <Languages className="h-6 w-6 text-purple" />,
      bookopen: <BookOpen className="h-6 w-6 text-purple" />,
    }

    return icons[iconName as keyof typeof icons] || <FileText className="h-5 w-5 text-purple-600" />
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

  const getStatusText = (status: string) => {
  switch (status) {
    case "Live":
      return "Live";
    case "In Progress":
      return "In Progress";
    case "Coming Soon":
      return "Coming Soon";
    case "Proposal":
      return "Proposal";
    case "Mothballed":
      return "Mothballed";
    case "MVP":
      return "MVP";
    default:
      return status;
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


  useEffect(() => {
    if (!feature?.id) return;

    axios
      .get(`${baseUrl}/api/votes/${feature.id}`)
      .then(async (res) => {
        const stored = await getVote(feature.id);
        const voted = stored?.voted ?? null;

        setVotes(res.data.upvotes);
        setHasVoted(Boolean(voted));
        await setVote(feature.id, { count: res.data.upvotes, voted: res.data.upvotes ? voted : null });
      })
      .catch((error) => {
        console.error("Failed to fetch vote:", error);
      });
  }, [feature.id]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow">
      <div className="flex p-4">
        {/* Voting column */}
        <div className="flex flex-col items-center mr-4 w-16">
          <button 
            className={`h-8 w-8 rounded-full flex items-center justify-center group ${
              hasVoted ? "bg-purple text-white" : "bg-gray-200 hover:bg-purple-700"
            }`}
            onClick={handleVote}
          >
            <ChevronUp
              className={`h-5 w-5 transition-colors ${
                hasVoted ? "text-white" : "text-black group-hover:text-white"
              }`}
            />
          </button>
          <span className="font-semibold text-lg my-1">{votes}</span>
        </div>

        {/* Content column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-md">{getFeatureIcon(feature.icon)}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                  <Badge className={getStatusColor(feature.status)}>
                    {getStatusIcon(feature.status)}
                    <span className="ml-1">{getStatusText(feature.status)}</span>
                  </Badge>
                  {feature.category.map((cat, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-50 text-gray-700 border-gray-200 mr-1 mb-1"
                    >
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
                        <Package className="h-4 w-4 text-gray-700" />
                      </span>
                      <span className="capitalize">{cat}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="mt-2 text-gray-600">{feature.description}</div>

        </div>
      </div>
    </div>
  )
}
