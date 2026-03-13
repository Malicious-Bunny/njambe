import { Text } from '@/components/ui/text';
import {
  fetchOfferById,
  type CustomerOfferDetail,
  type ProviderSkill,
} from '@/lib/customer/requests';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {
  ArrowLeftIcon,
  BabyCarriageIcon,
  BookOpenIcon,
  BroomIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  CheckCircleIcon,
  HeartIcon,
  LeafIcon,
  MapPinIcon,
  PawPrintIcon,
  StarIcon,
  TruckIcon,
  WrenchIcon,
  XCircleIcon,
  XIcon,
} from 'phosphor-react-native';
import * as React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ICON_MAP = {
  WrenchIcon,
  BroomIcon,
  LeafIcon,
  PawPrintIcon,
  TruckIcon,
  BookOpenIcon,
  BabyCarriageIcon,
  HeartIcon,
} as const;

function lastSeenText(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `Active ${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Active ${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `Active ${diffDays}d ago`;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function RatingBar({ label, score }: { label: string; score: number }) {
  return (
    <View className="flex-row items-center gap-3">
      <Text className="w-28 text-sm text-muted-foreground">{label}</Text>
      <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
        <View
          className="h-1.5 rounded-full bg-amber-500"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </View>
      <Text className="w-4 text-right text-sm font-semibold text-foreground">{score}</Text>
    </View>
  );
}

function SkillAccordion({
  skill,
  expanded,
  onToggle,
  iconColor,
}: {
  skill: ProviderSkill;
  expanded: boolean;
  onToggle: () => void;
  iconColor: string;
}) {
  const SkillIcon = ICON_MAP[skill.categoryIcon];
  return (
    <View className="overflow-hidden rounded-2xl border border-border bg-card">
      <Pressable
        onPress={onToggle}
        className="flex-row items-center px-4 py-3 active:bg-secondary"
      >
        <View
          className="mr-3 h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: skill.categoryColor }}
        >
          <SkillIcon size={16} color="#ffffff" weight="regular" />
        </View>
        <Text className="flex-1 font-medium text-foreground">{skill.categoryName}</Text>
        {expanded ? (
          <CaretUpIcon size={14} color={iconColor} weight="bold" />
        ) : (
          <CaretDownIcon size={14} color={iconColor} weight="bold" />
        )}
      </Pressable>
      {expanded && (
        <>
          <View className="h-px bg-border" />
          <View className="px-4 py-3">
            <Text className="mb-1 text-sm font-semibold text-foreground">
              {skill.servicesCompleted} services completed
            </Text>
            <Text className="text-sm leading-relaxed text-muted-foreground">
              {skill.description}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

export default function OfferDetailScreen() {
  const { offerId } = useLocalSearchParams<{ offerId: string }>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? '#a1a1aa' : '#71717a';

  const [offer, setOffer] = React.useState<CustomerOfferDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [reviewDrawerVisible, setReviewDrawerVisible] = React.useState(false);
  const [expandedSkills, setExpandedSkills] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    if (!offerId) return;
    fetchOfferById(offerId)
      .then(setOffer)
      .finally(() => setLoading(false));
  }, [offerId]);

  const toggleSkill = (index: number) => {
    setExpandedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const openReviews = () => {
    setReviewDrawerVisible(true);
  };

  if (loading || !offer) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={[]}>
        <View className="flex-row items-center border-b border-border px-4 py-3">
          <View className="h-10 w-10" />
          <View className="flex-1" />
          <View className="h-10 w-10" />
        </View>
        <View className="items-center py-8 gap-3">
          <View className="h-20 w-20 rounded-full bg-card opacity-40" />
          <View className="h-5 w-32 rounded-xl bg-card opacity-40" />
          <View className="h-4 w-24 rounded-xl bg-card opacity-40" />
        </View>
        <View className="mx-4 h-28 rounded-2xl bg-card opacity-40" />
      </SafeAreaView>
    );
  }

  const firstName = offer.providerName.split(' ')[0];
  const skillIcon = offer.skills[0]?.categoryIcon ?? 'BookOpenIcon';
  const skillColor = offer.skills[0]?.categoryColor ?? '#71717a';
  const ReviewIcon = ICON_MAP[skillIcon];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={[]}>
      {/* Header */}
      <View className="flex-row items-center border-b border-border px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-xl active:bg-secondary"
        >
          <ArrowLeftIcon size={22} color={iconColor} weight="regular" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">{firstName}</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Avatar + name + rating */}
        <View className="items-center px-4 pt-7 pb-5">
          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: offer.providerAvatarColor }}
          >
            <Text className="text-2xl font-bold" style={{ color: '#ffffff' }}>
              {offer.providerInitials}
            </Text>
          </View>
          <Text className="mt-3 text-2xl font-bold text-foreground">{offer.providerName}</Text>
          <View className="mt-1.5 flex-row items-center gap-1.5">
            <StarIcon size={14} color="#F59E0B" weight="fill" />
            <Text className="text-sm font-semibold text-foreground">{offer.rating}/5</Text>
            <Text className="text-sm text-muted-foreground">· {offer.reviewCount} reviews</Text>
          </View>
        </View>

        {/* Bio */}
        <View className="px-5 pb-4">
          <Text className="text-sm leading-relaxed text-foreground">{offer.bio}</Text>
        </View>

        {/* Location + last seen */}
        <View className="flex-row items-center justify-between px-5 pb-5">
          <View className="flex-row items-center gap-1.5">
            <MapPinIcon size={13} color={iconColor} weight="regular" />
            <Text className="text-sm text-muted-foreground">{offer.location}</Text>
          </View>
          <Text className="text-sm text-muted-foreground">{lastSeenText(offer.lastSeenAt)}</Text>
        </View>

        <View className="h-px bg-border" />

        {/* Reviews section */}
        <View className="px-4 py-5">
          <Text className="mb-3 text-lg font-bold text-foreground">Reviews</Text>

          {/* Summary row */}
          <Pressable
            onPress={openReviews}
            className="mb-4 flex-row items-center rounded-2xl border border-border bg-card px-4 py-3 active:bg-secondary"
          >
            <View className="mr-2 flex-row gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} size={16} color="#F59E0B" weight="fill" />
              ))}
            </View>
            <Text className="flex-1 text-sm text-muted-foreground">
              Average {offer.rating}/5 ({offer.reviewCount} reviews)
            </Text>
            <CaretRightIcon size={13} color={iconColor} weight="bold" />
          </Pressable>

          {/* Rating breakdown */}
          <View className="gap-2.5">
            <RatingBar label="Service quality" score={offer.ratingBreakdown.serviceQuality} />
            <RatingBar label="Communication" score={offer.ratingBreakdown.communication} />
            <RatingBar label="Punctuality" score={offer.ratingBreakdown.punctuality} />
            <RatingBar label="Value for money" score={offer.ratingBreakdown.valueForMoney} />
          </View>
        </View>

        <View className="h-px bg-border" />

        {/* Skills section */}
        {offer.skills.length > 0 && (
          <View className="px-4 py-5">
            <Text className="mb-3 text-lg font-bold text-foreground">Skills</Text>
            <View className="gap-2">
              {offer.skills.map((skill, index) => (
                <SkillAccordion
                  key={index}
                  skill={skill}
                  expanded={expandedSkills.has(index)}
                  onToggle={() => toggleSkill(index)}
                  iconColor={iconColor}
                />
              ))}
            </View>
          </View>
        )}

        <View className="h-px bg-border" />

        {/* Verifications section */}
        <View className="px-4 py-5">
          <Text className="mb-3 text-lg font-bold text-foreground">Verifications</Text>
          <View className="overflow-hidden rounded-2xl border border-border bg-card">
            {[
              { label: 'Email verified', verified: offer.verifications.emailVerified },
              { label: 'Phone verified', verified: offer.verifications.phoneVerified },
              { label: 'ID verified', verified: offer.verifications.idVerified },
            ].map(({ label, verified }, i, arr) => (
              <View key={label}>
                <View className="flex-row items-center px-4 py-3.5">
                  {verified ? (
                    <CheckCircleIcon size={20} color="#22C55E" weight="fill" />
                  ) : (
                    <XCircleIcon size={20} color="#EF4444" weight="fill" />
                  )}
                  <Text className="ml-3 text-sm text-foreground">{label}</Text>
                </View>
                {i < arr.length - 1 && <View className="ml-4 h-px bg-border" />}
              </View>
            ))}
          </View>
        </View>

        <View className="h-px bg-border" />

        {/* Report section */}
        <View className="px-4 py-5">
          <Text className="mb-3 text-lg font-bold text-foreground">Report an issue?</Text>
          <View className="items-center rounded-2xl border border-border bg-card px-4 py-4">
            <Pressable>
              <Text className="text-sm font-medium text-amber-500">Report this provider</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View className="border-t border-border px-4 pb-6 pt-3">
        <Pressable className="items-center rounded-2xl bg-primary py-3.5 active:opacity-90">
          <Text className="font-semibold text-primary-foreground">View conversation</Text>
        </Pressable>
      </View>

      {/* Reviews drawer */}
      <Modal
        visible={reviewDrawerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewDrawerVisible(false)}
        statusBarTranslucent
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="absolute inset-0 bg-black/50"
            onPress={() => setReviewDrawerVisible(false)}
          />
          <View className="rounded-t-3xl bg-card px-6 pb-10 pt-5">
            {/* Drag handle */}
            <View className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

            {/* Drawer header */}
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-foreground">Reviews</Text>
              <Pressable
                onPress={() => setReviewDrawerVisible(false)}
                className="h-8 w-8 items-center justify-center rounded-xl active:bg-secondary"
                hitSlop={8}
              >
                <XIcon size={18} color={isDark ? '#fafafa' : '#18181b'} weight="regular" />
              </Pressable>
            </View>

            {/* Scrollable reviews list */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 420 }}
            >
              {offer.reviews.map((review, i) => (
                <View key={review.id}>
                  {/* Service row */}
                  <View className="mb-2 flex-row items-center gap-2">
                    <View
                      className="h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: skillColor }}
                    >
                      <ReviewIcon size={15} color="#ffffff" weight="regular" />
                    </View>
                    <Text className="text-sm text-muted-foreground">{review.serviceName}</Text>
                  </View>

                  {/* Stars */}
                  <View className="mb-1.5 flex-row gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} size={15} color="#F59E0B" weight="fill" />
                    ))}
                  </View>

                  {/* Comment */}
                  <Text className="mb-1 text-sm leading-relaxed text-foreground">
                    {review.comment}
                  </Text>

                  {/* Date + reviewer */}
                  <Text className="text-xs text-muted-foreground">
                    {formatDate(review.date)} · {review.reviewerName}
                  </Text>

                  {/* Divider (not after last) */}
                  {i < offer.reviews.length - 1 && (
                    <View className="my-4 h-px bg-border" />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
