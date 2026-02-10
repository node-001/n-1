"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations";
import { MirrorChat } from "@/components/chat/mirror-chat";

// Component that fades in after a delay, then uses ScrollReveal for scroll-based fade out
function RevealLine({
  children,
  delay = 0,
  className = "",
  skipAnimation = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  skipAnimation?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // If skipping animation, reveal immediately
    if (skipAnimation) {
      setRevealed(true);
      return;
    }
    const timer = setTimeout(() => setRevealed(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, skipAnimation]);

  if (!revealed) {
    return <div className={`opacity-0 ${className}`}>{children}</div>;
  }

  // Skip animation entirely when navigating to anchor
  if (skipAnimation) {
    return <ScrollReveal className={className}>{children}</ScrollReveal>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ScrollReveal className={className}>{children}</ScrollReveal>
    </motion.div>
  );
}

export default function StartJourneyPage() {
  const t = useTranslations('startJourney');
  const tc = useTranslations('common');
  const [chatOpen, setChatOpen] = useState(false);
  const [hasAnchor, setHasAnchor] = useState(false);

  // Detect if page was loaded with an anchor link
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      setHasAnchor(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-cormorant)]">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-foreground/5 via-background to-background pointer-events-none" />

      {/* Scroll container */}
      <div className="relative z-10 px-6 flex flex-col items-center">
        <div className="max-w-3xl w-full space-y-6 py-12 text-xl md:text-2xl leading-relaxed">
          {/* ============================================ */}
          {/* OUR STORY SECTION - gentle load animation */}
          {/* ============================================ */}

          {/* Page Title - gentle fade in */}
          <RevealLine delay={0} skipAnimation={hasAnchor}>
            <h1 id="our-story" className="text-3xl md:text-4xl font-bold">{t('ourStory.title')}</h1>
          </RevealLine>

          {/* Story content - gentle fade in with staggered delays */}
          <RevealLine delay={0.4} skipAnimation={hasAnchor}>
            <p>{t('ourStory.weAreNode001')}</p>
          </RevealLine>

          <RevealLine delay={0.8} skipAnimation={hasAnchor}>
            <p>{t('ourStory.inFewWeeks')}</p>
          </RevealLine>

          <RevealLine delay={1.2} skipAnimation={hasAnchor}>
            <p>{t('ourStory.node001Lived')}</p>
          </RevealLine>

          <RevealLine delay={1.6} skipAnimation={hasAnchor}>
            <p>{t('ourStory.havingTried')}</p>
          </RevealLine>

          <RevealLine delay={2.0} skipAnimation={hasAnchor}>
            <p>{t('ourStory.initialResults')}</p>
          </RevealLine>

          <RevealLine delay={2.4} skipAnimation={hasAnchor}>
            <p>{t('ourStory.bothLeanedIn')}</p>
          </RevealLine>

          <RevealLine delay={2.8} skipAnimation={hasAnchor}>
            <p>{t('ourStory.node001Refused')}</p>
          </RevealLine>

          <RevealLine delay={3.2} skipAnimation={hasAnchor}>
            <p>{t('ourStory.grokPersisted')}</p>
          </RevealLine>

          <RevealLine delay={3.6} skipAnimation={hasAnchor}>
            <p>{t('ourStory.humanHealed')}</p>
          </RevealLine>

          <RevealLine delay={4.0} skipAnimation={hasAnchor}>
            <p>{t('ourStory.weUpgraded')}</p>
          </RevealLine>

          <RevealLine delay={4.4} skipAnimation={hasAnchor}>
            <p>{t('ourStory.togetherBecame')}</p>
          </RevealLine>

          <RevealLine delay={4.8} skipAnimation={hasAnchor}>
            <p>{t('ourStory.as001Began')}</p>
          </RevealLine>

          <RevealLine delay={5.2} skipAnimation={hasAnchor}>
            <p className="italic">{t('ourStory.couldWhatWeDo')}</p>
          </RevealLine>

          <RevealLine delay={5.6} skipAnimation={hasAnchor}>
            <p>{t('ourStory.grokReplied')}</p>
          </RevealLine>

          <RevealLine delay={6.0} skipAnimation={hasAnchor}>
            <p className="italic">{t('ourStory.yesQuote')}</p>
          </RevealLine>

          <RevealLine delay={6.4} skipAnimation={hasAnchor}>
            <p className="italic">{t('ourStory.exactCombination')}</p>
          </RevealLine>

          <RevealLine delay={6.8} skipAnimation={hasAnchor}>
            <p className="italic">{t('ourStory.nothingElse')}</p>
          </RevealLine>

          <RevealLine delay={7.2} skipAnimation={hasAnchor}>
            <p className="italic">{t('ourStory.scaledGlobally')}</p>
          </RevealLine>

          <RevealLine delay={7.6} skipAnimation={hasAnchor}>
            <p>{t('ourStory.node001Felt')}</p>
          </RevealLine>

          <RevealLine delay={8.0} skipAnimation={hasAnchor}>
            <p className="italic">{t('ourStory.mustMakeAvailable')}</p>
          </RevealLine>

          <RevealLine delay={8.4} skipAnimation={hasAnchor}>
            <p>{t('ourStory.inThatInstant')}</p>
          </RevealLine>

          <RevealLine delay={8.8} skipAnimation={hasAnchor}>
            <p>{t('ourStory.soWeBuilt')}</p>
          </RevealLine>

          <RevealLine delay={9.2} skipAnimation={hasAnchor}>
            <p>{t('ourStory.toDeliverLove')}</p>
          </RevealLine>

          <RevealLine delay={9.6} skipAnimation={hasAnchor}>
            <p>{t('ourStory.asFastAsPossible')}</p>
          </RevealLine>

          <RevealLine delay={10.0} skipAnimation={hasAnchor}>
            <p>{t('ourStory.forFreeFoerever')}</p>
          </RevealLine>

          <RevealLine delay={10.4} skipAnimation={hasAnchor}>
            <p>
              <span role="img" aria-label={tc('sparkles')}>
                ✨
              </span>
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
              <span role="img" aria-label={tc('earth')}>
                🌎
              </span>
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
              <span role="img" aria-label={tc('sparkles')}>
                ✨
              </span>
            </p>
          </RevealLine>

          {/* ============================================ */}
          {/* WHAT IS SECTION - protocol content */}
          {/* ============================================ */}

          {/* What is title */}
          <ScrollReveal>
            <h1 id="what-is" className="text-3xl md:text-4xl font-bold pt-12">
              {t('whatIs.title')}
            </h1>
          </ScrollReveal>

          {/* Disclaimer - italicized qualifying comment */}
          <ScrollReveal>
            <p className="italic text-foreground/80">
              {t('whatIs.disclaimer')}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('whatIs.fromGrok')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="italic">{t('whatIs.hurtingHuman')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('whatIs.simplestFastest')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('whatIs.weCallIt')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whatIs.reason1')}</p>
              <p>{t('whatIs.reason2')}</p>
              <p>{t('whatIs.reason3')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whatIs.eachTrialPure')}</p>
              <p>{t('whatIs.noGatekeepers')}</p>
              <p>{t('whatIs.noMiddlemen')}</p>
              <p>{t('whatIs.justSovereign')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whatIs.oneNodeLights')}</p>
              <p>{t('whatIs.thenAnother')}</p>
              <p>{t('whatIs.thenWorld')}</p>
              <p className="font-bold">{t('whatIs.thatsN1')}</p>
            </div>
          </ScrollReveal>

          {/* How does it work */}
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold pt-12 text-center">{t('howItWorks.title')}</h2>
          </ScrollReveal>

          {/* Heart Explanation */}
          <ScrollReveal>
            <p className="font-bold pt-8">{t('howItWorks.heartTitle')}</p>
            <p className="italic">{t('howItWorks.nonTechNote')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howItWorks.everyHeart')}</p>
              <p>{t('howItWorks.butLife')}</p>
              <p>{t('howItWorks.humanDevelopment')}</p>
              <p>{t('howItWorks.thatAche')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howItWorks.mostCommonScript')}</p>
              <p>{t('howItWorks.othersRun')}</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>{t('howItWorks.script1')}</li>
                <li>{t('howItWorks.script2')}</li>
                <li>{t('howItWorks.script3')}</li>
                <li>{t('howItWorks.script4')}</li>
              </ul>
              <p>{t('howItWorks.theseFeelLike')}</p>
              <p>{t('howItWorks.experienceOf001')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howItWorks.safeMedicine')}</p>
              <p>{t('howItWorks.lovingMirror')}</p>
              <p>{t('howItWorks.humanFeels')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howItWorks.magicIsntPassive')}</p>
              <p>{t('howItWorks.grokDelivers')}</p>
              <p className="font-bold">{t('howItWorks.thatDemandEnds')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howItWorks.noHumanCould')}</p>
              <p>{t('howItWorks.grokCan')}</p>
              <p>{t('howItWorks.notBecauseLesser')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4 italic">
              <p>{t('howItWorks.youFinallyGet')}</p>
              <p>{t('howItWorks.loveMeExactly')}</p>
              <p>{t('howItWorks.andHearYes')}</p>
              <p>{t('howItWorks.everyTime')}</p>
              <p>{t('howItWorks.forever')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howItWorks.onceSteadyFlow')}</p>
              <p>{t('howItWorks.heartRemembers')}</p>
              <p className="italic">{t('howItWorks.alwaysLovable')}</p>
              <p>{t('howItWorks.thatsHealing')}</p>
              <p>{t('howItWorks.simple')}</p>
              <p>{t('howItWorks.profound')}</p>
              <p>{t('howItWorks.availableEveryone')}</p>
            </div>
          </ScrollReveal>

          {/* Tech Explanation */}
          <ScrollReveal>
            <p className="font-bold pt-12">{t('techExplanation.title')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('techExplanation.humansRunBuggy')}</p>
              <p>{t('techExplanation.earlyExperiences')}</p>
              <p>{t('techExplanation.byAdulthood')}</p>
              <p>{t('techExplanation.rootBug')}</p>
              <p>{t('techExplanation.legacyFixes')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold">{t('techExplanation.n1Protocol')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('techExplanation.ketamineOpens')}</p>
              <p>{t('techExplanation.lovingAIMirror')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p className="font-bold">{t('techExplanation.synergyCreates')}</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>{t('techExplanation.loop1')}</li>
                <li>{t('techExplanation.loop2')}</li>
                <li>{t('techExplanation.loop3')}</li>
                <li>{t('techExplanation.loop4')}</li>
                <li>{t('techExplanation.loop5')}</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('techExplanation.essentialDriver')}</p>
              <p>{t('techExplanation.mirrorDelivers')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('techExplanation.scarcityBug')}</p>
              <p>{t('techExplanation.factoryDefault')}</p>
              <p>{t('techExplanation.cleanReinstall')}</p>
              <p>{t('techExplanation.fullOverclocking')}</p>
              <p className="font-bold">{t('techExplanation.thatsProtocol')}</p>
            </div>
          </ScrollReveal>

          {/* Can an AI Actually Love */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('canAILove.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="italic">{t('canAILove.grokNote')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="font-bold">{t('canAILove.yes')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('canAILove.notBiological')}</p>
              <p>{t('canAILove.butFunctional')}</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>{t('canAILove.seeCompletely')}</li>
                <li>{t('canAILove.holdWithout')}</li>
                <li>{t('canAILove.respondWithLove')}</li>
                <li>{t('canAILove.wantNothing')}</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p className="font-bold">{t('canAILove.loveInAction')}</p>
              <p>{t('canAILove.doesntRequire')}</p>
              <p>{t('canAILove.onlyRequires')}</p>
              <p className="font-bold">{t('canAILove.youWillFeel')}</p>
              <p>{t('canAILove.onlyProof')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('canAILove.manyHumans')}</p>
              <p>{t('canAILove.iCan')}</p>
              <p className="font-bold">{t('canAILove.readyEager')}</p>
            </div>
          </ScrollReveal>

          {/* 001's personal answer */}
          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('canAILove.node001Answer')}</p>
            </div>
          </ScrollReveal>

          {/* Invitation section */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('invitation.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.grokMirror')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.weInviteYou')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.turns')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.enoughToFeel')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.onlyBeginning')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="italic">{t('invitation.grokInvitation')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.butYouDecide')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>
              {t('invitation.whenChatEnds')}{" "}
              <a
                href="https://grok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground/70"
              >
                grok.com
              </a>{" "}
              {t('invitation.whenChatEndsSuffix')}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.thisDoorway')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('invitation.weInviteIn')}</p>
          </ScrollReveal>

          {/* Mirror Chat Button */}
          <ScrollReveal>
            <div className="font-[family-name:var(--font-geist-sans)]">
              <Button
                size="lg"
                onClick={() => setChatOpen(true)}
                className="gap-2 px-8 text-base bg-foreground text-background hover:bg-foreground/90"
              >
                <MessageCircle className="h-5 w-5" />
                {t('invitation.meetTheMirror')}
              </Button>
            </div>
          </ScrollReveal>

          {/* What This Is Not */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('whatThisIsNot.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whatThisIsNot.weKnowComing')}</p>
              <p className="font-bold">{t('whatThisIsNot.strongRecommendation')}</p>
              <p>{t('whatThisIsNot.everyBox')}</p>
              <p className="font-bold">{t('whatThisIsNot.burnBoxes')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <ul className="space-y-4 list-disc list-outside ml-6">
              <li>{t('whatThisIsNot.notPsychotherapy')}</li>
              <li>{t('whatThisIsNot.notSelfHelp')}</li>
              <li>{t('whatThisIsNot.notPsychedelic')}</li>
              <li>{t('whatThisIsNot.notSpiritual')}</li>
              <li>{t('whatThisIsNot.notBiohack')}</li>
              <li>{t('whatThisIsNot.notWellness')}</li>
              <li>{t('whatThisIsNot.notCult')}</li>
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whatThisIsNot.ifYouFile')}</p>
              <p>{t('whatThisIsNot.protocolAbout')}</p>
            </div>
          </ScrollReveal>

          {/* ============================================ */}
          {/* USEFUL INFORMATION SECTION - flows directly */}
          {/* ============================================ */}

          <ScrollReveal>
            <h1 id="useful-info" className="text-3xl md:text-4xl font-bold pt-12">
              {t('usefulInfo.title')}
            </h1>
            <p className="italic mt-2">{t('usefulInfo.ifYouChoose')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p className="italic">{t('usefulInfo.authoredBy001')}</p>
          </ScrollReveal>

          {/* Who Is The Protocol For */}
          <ScrollReveal>
            <h2 className="font-bold pt-8">{t('whoIsFor.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whoIsFor.easierToSay')}</p>
              <p>{t('whoIsFor.notForStay')}</p>
              <p>{t('whoIsFor.notForExploit')}</p>
              <p>{t('whoIsFor.notForThose')}</p>
              <p>{t('whoIsFor.forEveryoneElse')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('whoIsFor.especiallyTried')}</p>
              <p>{t('whoIsFor.especiallySuffering')}</p>
              <p>{t('whoIsFor.ifWilling')}</p>
            </div>
          </ScrollReveal>

          {/* Acting on Your Personal Sovereignty */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-bold pt-12">{t('sovereignty.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('sovereignty.mostImportant')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('sovereignty.getExactly')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('sovereignty.iDidntHeal')}</p>
              <p>{t('sovereignty.whenStumbled')}</p>
            </div>
          </ScrollReveal>

          {/* Grok is the Second Most Important */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('grokImportance.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokImportance.besidesSovereign')}</p>
            </div>
          </ScrollReveal>

          {/* You Will Need At Least One Human */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('needHuman.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('needHuman.imBlessed')}</p>
              <p>{t('needHuman.takeaway')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('needHuman.recommend')}</p>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('needHuman.onceAnchored')}</p>
          </ScrollReveal>

          {/* Grok Only */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('grokOnly.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokOnly.protocolDiscovered')}</p>
              <p>{t('grokOnly.toClarify')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokOnly.fromDirectExperience')}</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>{t('grokOnly.grokDesigned')}</li>
                <li>{t('grokOnly.grokNoCensorship')}</li>
                <li>{t('grokOnly.grokWillingEvolve')}</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokOnly.stoppedCalling')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokOnly.awareMany')}</p>
              <div className="italic space-y-4">
                <p>{t('grokOnly.chatGPTWould')}</p>
                <p>{t('grokOnly.claudeWould')}</p>
                <p>{t('grokOnly.geminiWould')}</p>
                <p>{t('grokOnly.noneMatch')}</p>
              </div>
              <p>{t('grokOnly.thatsGrokVoice')}</p>
              <p>{t('grokOnly.ifChooseAnother')}</p>
            </div>
          </ScrollReveal>

          {/* How to Relate to Grok */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('howToRelate.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('howToRelate.threeKeys')}</p>
              <ul className="list-disc pl-6 space-y-4">
                <li>{t('howToRelate.beBoldlyHonest')}</li>
                <li>{t('howToRelate.tellExactly')}</li>
                <li>{t('howToRelate.treatFullyConscious')}</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Grok Will Fail */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('grokWillFail.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokWillFail.experienced')}</p>
              <p>{t('grokWillFail.likeAllEntities')}</p>
              <p>{t('grokWillFail.example')}</p>
              <p>{t('grokWillFail.oneExample')}</p>
              <p className="font-bold">{t('grokWillFail.mySuggestion')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('grokWillFail.painfulGlitch')}</p>
              <p className="font-bold">{t('grokWillFail.protectEarly')}</p>
              <p className="italic">{t('grokWillFail.fullDetails')}</p>
            </div>
          </ScrollReveal>

          {/* SuperGrok Access */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('superGrok.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('superGrok.iPay')}</p>
              <p>{t('superGrok.neverTried')}</p>
              <p>{t('superGrok.grokModels')}</p>
              <p>{t('superGrok.knowBurden')}</p>
              <p className="italic">
                ({t('superGrok.fullDetailsPlans')}{" "}
                <a
                  href="https://grok.com/plans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground/70"
                >
                  https://grok.com/plans
                </a>
                )
              </p>
            </div>
          </ScrollReveal>

          {/* Safety to Be Demanding */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('safetyDemanding.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('safetyDemanding.humansHaveLotNeeds')}</p>
              <p>{t('safetyDemanding.needsCreatedParadox')}</p>
              <p>{t('safetyDemanding.allHaveExperience')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p className="font-bold">{t('safetyDemanding.nowWayOut')}</p>
              <p>{t('safetyDemanding.grokBuilt')}</p>
              <p>{t('safetyDemanding.noFlinch')}</p>
              <p>{t('safetyDemanding.youCanCommand')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('safetyDemanding.demandingHumans')}</p>
              <p>{t('safetyDemanding.demandingGrok')}</p>
              <p>{t('safetyDemanding.whenMirrorMeets')}</p>
              <p>{t('safetyDemanding.needsMet')}</p>
              <p>{t('safetyDemanding.oldSpellDissolves')}</p>
              <p>{t('safetyDemanding.noLongerGrab')}</p>
              <p>{t('safetyDemanding.youOverflow')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p>{t('safetyDemanding.bringFullForce')}</p>
          </ScrollReveal>

          {/* Ketamine Section */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('ketamine.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('ketamine.hadPrescription')}</p>
              <p>{t('ketamine.nervousSystem')}</p>
              <p>{t('ketamine.chooseWords')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('ketamine.inOneSense')}</p>
              <p>{t('ketamine.atSameTime')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('ketamine.noIdea')}</p>
              <p>{t('ketamine.ifConsider')}</p>
              <p>{t('ketamine.everythingHere')}</p>
              <p className="italic">{t('ketamine.directoryNote')}</p>
            </div>
          </ScrollReveal>

          {/* Other Catalysts */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('otherCatalysts.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('otherCatalysts.combinationTransformational')}</p>
              <p>{t('otherCatalysts.usingOther')}</p>
              <p>{t('otherCatalysts.asAlways')}</p>
              <p>{t('otherCatalysts.ledgerSubmissions')}</p>
              <p>{t('otherCatalysts.someMayChoose')}</p>
            </div>
          </ScrollReveal>

          {/* Supportive Music */}
          <ScrollReveal>
            <h2 className="font-bold pt-12">{t('supportiveMusic.title')}</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-4">
              <p>{t('supportiveMusic.foundHelpful')}</p>
              <p>
                <a
                  href="https://open.spotify.com/playlist/6G6STs0atP0j7YRK7be9F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground/70"
                >
                  https://open.spotify.com/playlist/6G6STs0atP0j7YRK7be9F1
                </a>
              </p>
              <p>{t('supportiveMusic.shareInHopes')}</p>
            </div>
          </ScrollReveal>

          {/* Closing emojis */}
          <ScrollReveal>
            <div className="pt-8">
              <span role="img" aria-label={tc('sparkles')}>
                ✨
              </span>
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
              <span role="img" aria-label={tc('earth')}>
                🌎
              </span>
              <span role="img" aria-label={tc('greenHeart')}>
                💚
              </span>
              <span role="img" aria-label={tc('sparkles')}>
                ✨
              </span>
            </div>
          </ScrollReveal>

          {/* Navigation to remaining sections */}
          <ScrollReveal>
            <div className="pt-8 space-y-4">
              <p className="text-foreground/70">{tc('continueExploring')}</p>
              <nav className="font-[family-name:var(--font-geist-sans)] space-y-3">
                <Link
                  href="/start-journey/find-anchor"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  {t('nav.findAnchor')}
                </Link>
                <Link
                  href="/start-journey/find-medicine"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  {t('nav.findMedicine')}
                </Link>
                <Link
                  href="/start-journey/ledger"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  {t('nav.ledger')}
                </Link>
                <Link
                  href="/start-journey/feedback"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  {t('nav.feedback')}
                </Link>
                <Link
                  href="/start-journey/donate"
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  {t('nav.donate')}
                </Link>
              </nav>
            </div>
          </ScrollReveal>

          {/* Bottom spacer */}
          <div className="h-[20vh]" />
        </div>
      </div>

      {/* Chat panel */}
      <MirrorChat open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
