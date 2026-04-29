import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        photos: resolve(__dirname, 'photos.html'),
        essays: resolve(__dirname, 'essays.html'),
        essayWhoGetsToEndTheWorld: resolve(__dirname, 'essay-who-gets-to-end-the-world.html'),
        essayCloudLabsAndTheNewSupplyChainForBioterrorism: resolve(__dirname, 'essay-cloud-labs-and-the-new-supply-chain-for-bioterrorism.html'),
        essayWhatIsItFor: resolve(__dirname, 'essay-what-is-it-for.html'),
        essayFdaForAi: resolve(__dirname, 'essay-fda-for-ai.html'),
        essayWhoGetsToStudyAi: resolve(__dirname, 'essay-who-gets-to-study-ai.html'),
        essayBlueAndGoldMistake: resolve(__dirname, 'essay-blue-and-gold-mistake.html'),
        essayAlgorithmicEye: resolve(__dirname, 'essay-algorithmic-eye.html'),
        essayIsArtStillWorthMaking: resolve(__dirname, 'essay-is-art-still-worth-making.html'),
        essayNarratingTheMachine: resolve(__dirname, 'essay-narrating-the-machine.html'),
        essayCanLlmKnowItself: resolve(__dirname, 'essay-can-llm-know-itself.html'),
        essayHoldingMirrorUpToNature: resolve(__dirname, 'essay-holding-mirror-up-to-nature.html'),
        essayAshAiForTherapy: resolve(__dirname, 'essay-ash-ai-for-therapy.html'),
        essayDreamersOfSiliconDream: resolve(__dirname, 'essay-dreamers-of-silicon-dream.html'),
        essaySfStoryOfInevitability: resolve(__dirname, 'essay-sf-story-of-inevitability.html'),
        essayCityInCyberpsychosis: resolve(__dirname, 'essay-city-in-cyberpsychosis.html'),
        essayWeAreAllVictorFrankenstein: resolve(__dirname, 'essay-we-are-all-victor-frankenstein.html'),
        essayLogicOfLesserEvil: resolve(__dirname, 'essay-logic-of-lesser-evil.html'),
        essayWritersWillOutlastAi: resolve(__dirname, 'essay-writers-will-outlast-ai.html'),
        essayNewIdolsSiliconValley: resolve(__dirname, 'essay-new-idols-silicon-valley.html'),
        essayMonomaniaAsProgress: resolve(__dirname, 'essay-monomania-as-progress.html'),
        essayWhyAiCantWriteLiterature: resolve(__dirname, 'essay-why-ai-cant-write-literature.html'),
      },
    },
  },
});
