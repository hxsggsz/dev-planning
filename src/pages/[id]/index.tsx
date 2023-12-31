import { Navbar } from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { type GetServerSideProps } from "next";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { CardBoard } from "@/components/ui/cardBoard";
import { Button } from "@/components/ui/button";
import { useFibboStore } from "@/stores/useFibboStore";
import { Coins, RotateCcw } from "lucide-react";
import { useRouter } from "next/router";
import { Switch } from "@/components/ui/switch";

interface PropTypes {
  id: string;
}

export default function Planning({ id }: PropTypes) {
  const [meId, setMeId] = useState<string | null>("");

  const router = useRouter();

  const fibboStore = useFibboStore((state) => state);

  const { toast } = useToast();

  const ctx = api.useContext();

  const searchRoom = api.room.searchRoom.useQuery(
    { id },
    { retry: false, refetchInterval: 1000 },
  );

  const getUser = api.user.searchUser.useQuery({ id: meId! }, { retry: false });

  if (getUser.isError) {
    void router.push(`/${id}/join`);
  }

  if (searchRoom.isError) {
    void router.push("/?error=404");
  }

  useEffect(() => {
    setMeId(localStorage.getItem("@me"));
  }, []);

  const updatePublicRoom = api.room.changePublicRoom.useMutation({
    onSuccess: () => ctx.invalidate(),
    onError: (error) =>
      toast({
        title: "Something bad happened",
        description: error.message,
      }),
  });

  const removeUserRoom = api.room.removeUserRoom.useMutation({
    onSuccess: () => ctx.invalidate(),
    onError: (error) =>
      toast({
        title: "Something bad happened",
        description: error.message,
      }),
  });
  const updateFibbo = api.room.changeFibboUserRoom.useMutation({
    onSuccess: () => ctx.invalidate(),
    onError: (error) =>
      toast({
        title: "Something bad happened",
        description: error.message,
      }),
  });

  const resetFibbo = api.room.resetFibboRoom.useMutation({
    onSuccess: () => ctx.invalidate(),
    onError: (error) =>
      toast({
        title: "Something bad happened",
        description: error.message,
      }),
  });
  const revealFibbo = api.room.revealFibboRoom.useMutation({
    onSuccess: () => ctx.invalidate(),
    onError: (error) =>
      toast({
        title: "Something bad happened",
        description: error.message,
      }),
  });

  function copyInviteLink() {
    void navigator.clipboard.writeText(`${location.origin}/${id}/join`);
    toast({
      title: "Link cliped!",
      description: "Now send to your frinds or coworkers",
    });
  }

  function removeUser(userToRemoveId: string) {
    removeUserRoom.mutate({ roomId: id, userToRemoveId, userAdminId: meId! });
  }

  function updateFibbonnacci(fibbo: string) {
    updateFibbo.mutate({
      fibbo,
      roomId: id,
      userId: meId!,
    });
  }

  function resetFibbonnacci() {
    resetFibbo.mutate({ roomId: id });
    fibboStore.resetFibbo();
    fibboStore.revealFibbo(false);
  }

  function revealFibbonacci() {
    revealFibbo.mutate({ roomId: id });
    fibboStore.revealFibbo();
  }

  const findMe = useMemo(() => {
    return searchRoom.data?.users.find((user) => user.id === meId);
  }, [searchRoom.data]);

  return (
    <>
      <Head>
        <title>Dev Planning - {searchRoom.data?.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full">
        <Toaster />
        <Navbar
          isAdmin={getUser.data?.role === "admin"}
          removeUser={removeUser}
          list={searchRoom.data?.users}
        />
        <div className="relative flex min-h-screen w-full items-center justify-center">
          <div className="absolute left-4 top-4">
            <Button onClick={copyInviteLink} variant="outline">
              Invite your friends
            </Button>

            {getUser.data?.role === "admin" && (
              <div className="mt-4 flex gap-2">
                <Switch
                  checked={searchRoom.data?.isPublic ?? true}
                  onCheckedChange={(boolean) =>
                    updatePublicRoom.mutate({ roomId: id, isPublic: boolean })
                  }
                />
                <p className="font-medium">
                  This room still public?{" "}
                  <span>{searchRoom.data?.isPublic ? "Yes" : "no"}</span>
                </p>
              </div>
            )}
          </div>

          <div className="rounded-md bg-main p-10">
            <h1 className="text-4xl font-bold">Let's Planning!</h1>
            {searchRoom.data && searchRoom.data.isReveal && (
              <>
                <h1 className="text-xl font-bold text-light/60">
                  Average:{" "}
                  <span className="text-light underline">
                    {searchRoom.data.averageRoom}
                  </span>
                </h1>
                <h1 className="text-xl font-bold text-light/60">
                  Fibbonacci:{" "}
                  <span className="text-light underline">
                    {searchRoom.data.fibboRoom}
                  </span>
                </h1>
              </>
            )}
            <div className="mt-2 flex min-w-52 gap-2">
              {getUser.data?.role === "admin" &&
              !searchRoom.data?.isReveal &&
              getUser.data?.fibbonacci ? (
                <Button variant="white" size="full" onClick={revealFibbonacci}>
                  <Coins /> Reveal
                </Button>
              ) : getUser.data?.role === "admin" && getUser.data?.fibbonacci ? (
                <Button variant="white" size="full" onClick={resetFibbonnacci}>
                  <RotateCcw /> Start new voting
                </Button>
              ) : (
                !getUser.data?.fibbonacci && (
                  <p className="text-xl font-semibold">Select a card</p>
                )
              )}
            </div>
          </div>
          {findMe && <CardBoard updateFibbonnacci={updateFibbonnacci} />}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  if (!id) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      id: id.toString(),
    },
  };
};
