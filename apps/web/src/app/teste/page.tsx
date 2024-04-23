import Image from 'next/image'

import glIcon from '@/assets/simposio-pai-logo.svg'

export default function Homepage() {
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="flex items-center gap-3">
          <Image
            src={glIcon}
            className="size-5"
            width={20}
            height={20}
            alt=""
          />
          <h1 className="text-sm font-medium">gl.video</h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Redefining video content</h2>

          <p className="font-medium leading-relaxed text-zinc-100">
            gl offers a comprehensive video solution tailored for online content
            creators, emphasizing seamless developer integration, transparent
            pricing, and exceptional user experience.
          </p>
          <h1>teste</h1>

          {/* <form action="" className="flex flex-col items-end gap-4">
            <Input placeholder="Full name" />
            <Input type="email" placeholder="Your e-mail" />
            <Input type="number" placeholder="Number of videos" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Where do you store your videos today?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vimeo">Vimeo</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Button size="sm" type="submit">
              Request access
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form> */}
        </div>
      </div>
    </div>
  )
}
