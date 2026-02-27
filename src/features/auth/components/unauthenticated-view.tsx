import { ShieldAlertIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const UnauthenticatedView = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-background p-2'>
            <div className='w-full max-w-lg bg-muted'>
                <Item variant='outline'>
                    <ItemMedia variant='icon'>
                        <ShieldAlertIcon />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>
                            Unauthorised Access
                        </ItemTitle>
                        <ItemDescription>
                            You are not unauthorised to access this page.
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <SignInButton>
                            <Button variant='outline' size='sm'>
                                Sign In
                            </Button>
                        </SignInButton>
                    </ItemActions>
                </Item>
                <div className='bg-background text-muted-foreground p-2 text-sm text-justify'>
                    <b>Notice:</b> This project runs on the free tier of the Gemini API. Due to free-tier limitations, you may experience slower responses or easily hit the rate limits and experience temporary downtime. If the app stops responding or something doesn't work, please try again after a short wait. To avoid rate limits, you can configure and use your own AI providers and paid API models in Settings; just run the project locally. For the configuration guide, visit the <a href="https://github.com/iamsayedanowar/Vibe" target='_blank' className='underline'>GitHub repo</a>.
                </div>
            </div>
        </div>
    );
};